import psycopg2

conn = psycopg2.connect(
    host="studentanalyzer-db.cq9oieoy4a2v.us-east-1.rds.amazonaws.com",
    port=5432,
    database="studentanalyzer",
    user="studentanalyzer",
    password="studentanalyzer"
)

tables = ['chat_log', 'chats_list', 'permissions', 'users']
table = input('table (select from chat_log, chats_list, permissions, users): ')
if table not in tables:
    while table not in tables:
        table = input('not a table, try again: ')

cursor = conn.cursor()
cursor.execute(f"SELECT * FROM {table};")
rows = cursor.fetchall()
for row in rows:
    print(row)