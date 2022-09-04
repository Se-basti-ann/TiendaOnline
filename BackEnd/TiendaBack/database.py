import mariadb

class Database:

    conn_params= {
        "user" : "bsale_test",
        "password" : "bsale_test",
        "host" : "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
        "database" : "bsale_test",
    }

    def __init__(self):
        try:
            self.connection = mariadb.connect(**self.conn_params)
        except :
            print("No se puede conectar a la base de datos")
            
    def select(self, query):
        results = []
        try:
            cursor = self.connection.cursor()
            cursor.execute(query)
            col_names = [row[0] for row in cursor.description]

            for row in cursor:
                object_row = {}
                for d in zip(col_names, row):
                    object_row.update({d[0]: d[1]})
                results.append(object_row)
            cursor.close()
        except:
            print("ERROR QUERY: "+query)

        return results

    def exe_query(self, query):
        try:
            # create a cursor
            with self.connection.cursor() as cursor:
                # execute the insert statement
                cursor.execute(query)
                # commit the change
                self.connection.commit()
        except Exception as e:
            print("ERROR QUERY: "+query + str(e))

    def closedb(self):
        try:
            self.connection.close()
        except:
            print("Error al cerrar conexion a base de datos")
