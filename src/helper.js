  async function handleHashClick() {
    try {
      const hex = await sha256Hex(passwordPlain);
      setComputedHash(hex);

      // if the textarea contains the placeholder, replace it
      if (bodyText && bodyText.includes('<sha256-of-password>')) {
        setBodyText(bodyText.replace(/<sha256-of-password>/g, hex));
        return;
      }

      // If action is createUser and body is empty, fill a minimal example with the hash
      if (action === 'createUser' && (!bodyText || !bodyText.trim())) {
        setBodyText(
          JSON.stringify({
            first_name: 'Test',
            last_name: 'User',
            username: 'test_user',
            password_sha256: hex,
          }, null, 2)
        );
        return;
      }

      try {
        const parsed = JSON.parse(bodyText);
        if (parsed && typeof parsed === 'object' && 'password_sha256' in parsed) {
          parsed.password_sha256 = hex;
          setBodyText(JSON.stringify(parsed, null, 2));
          return;
        }
      } catch (e) {
      }

    } catch (e) {
      setError(e.message || String(e));
    }
  }

  async function copyHashToClipboard() {
    if (!computedHash) return;
    try {
      await copyToClipboard(computedHash);
    } catch (e) {
    }
  }