from db import get_db_connection

def store_submission(submission):
    conn = get_db_connection()
    conn.execute('INSERT INTO submissions (submission) VALUES (?)', (submission,))
    conn.commit()
    conn.close()

def get_submissions():
    conn = get_db_connection()
    submissions = conn.execute('SELECT submission FROM submissions').fetchall()
    conn.close()
    return [dict(submission) for submission in submissions]