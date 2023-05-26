import sqlite3

def get_db_connection():
    conn = sqlite3.connect('submissions.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute(
        '''
        CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            submission TEXT NOT NULL
        );
        '''
    )
    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()