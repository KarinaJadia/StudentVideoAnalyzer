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

print('opening sql table')

with open("tables.sql", "r") as f:
    sql_script = f.read()

print('executing script')

cursor.execute(sql_script)

conn.commit()
cursor.close()
conn.close()

print("tables created")
