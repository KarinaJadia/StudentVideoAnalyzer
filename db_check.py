import psycopg2

print('connecting')

conn = psycopg2.connect(
    host="studentanalyzer-db.cq9oieoy4a2v.us-east-1.rds.amazonaws.com",
    port=5432,
    database="studentanalyzer-db",
    user="studentanalyzer",
    password="studentanalyzer"
)
cursor = conn.cursor()

print('executing script')

with open("tables.sql") as f:
    statements = f.read().split(';')
    for stmt in statements:
        if stmt.strip():
            cursor.execute(stmt)

conn.commit()
cursor.close()
conn.close()

print("tables created")
