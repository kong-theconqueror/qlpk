from db import init_db_from_file, drop_db, declare_procedure_db

if __name__ == '__main__':
    drop_db('drop_db.sql')
    init_db_from_file('db.sql')
    declare_procedure_db('sql\\doanhthu.sql')
    declare_procedure_db('sql\\luong.sql')
    declare_procedure_db('sql\\benh.sql')