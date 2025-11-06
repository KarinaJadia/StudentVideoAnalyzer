# this will create and RESET the database
# do not run unless you want to RESET the database and DELETE ALL DATA

# database: https://us-east-1.console.aws.amazon.com/rds/home?region=us-east-1#database:id=studentanalyzer-db

import psycopg2

password = input('password: ')

print('connecting')

conn = psycopg2.connect(
    host="studentanalyzer-db.cq9oieoy4a2v.us-east-1.rds.amazonaws.com",
    port=5432,
    database="studentanalyzer",
    user="studentanalyzer",
    password=password
)
cursor = conn.cursor()

print('executing script')

with open("tables.sql") as f:
    statements = f.read().split(';')
    for stmt in statements:
        if stmt.strip():
            cursor.execute(stmt)


print("tables created")

print('inserting test data')

for i in range(0, 3):

    user_data = {
        "first_name": f"FirstName{i}",
        "last_name": f"LastName{i}",
        "username": f"testuser{i}",
        "password_sha256": f"testuser{i}"
    }

    insert_query = """
    INSERT INTO users (first_name, last_name, username, password_sha256)
    VALUES (%(first_name)s, %(last_name)s, %(username)s, %(password_sha256)s)
    """

    cursor.execute(insert_query, user_data)

conn.commit()
cursor.close()
conn.close()