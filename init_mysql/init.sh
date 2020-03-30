echo "create database tbt_test"
mysql -uroot -p"$MYSQL_ROOT_PASSWORD" -e"CREATE DATABASE IF NOT EXISTS tbt_test; GRANT ALL PRIVILEGES ON tbt_test.* TO 'test'@'%'"
echo "import tbt data..."
mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" stylish< /data/20191222_night.sql
echo "set mysql_native_password..."
mysql -uroot -p"$MYSQL_ROOT_PASSWORD" -e"ALTER USER 'test'@'%' IDENTIFIED WITH mysql_native_password BY '1234'";
echo "done"