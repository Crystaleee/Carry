package edu.bupt.dmg.sqlhelper;

import java.sql.Connection;  
import java.sql.DriverManager;  
import java.sql.Statement;  
  
public class DatabaseHelper {  
  
    private String dbHost = "localhost";  
    private int dbPort = 3306;  
    private String dbName = "mysql";  
    private String dbUsername = "root";  
    private String dbPassword = "";  
  
    public void setDbHost(String dbHost) {  
        this.dbHost = dbHost;  
    }  
  
    public void setDbPort(int dbPort) {  
        this.dbPort = dbPort;  
    }  
  
    public void setDbName(String dbName) {  
        this.dbName = dbName;  
    }  
  
    public void setDbUsername(String dbUsername) {  
        this.dbUsername = dbUsername;  
    }  
  
    public void setDbPassword(String dbPassword) {  
        this.dbPassword = dbPassword;  
    }  
  
    private String getDbUrl() {  
        return String.format("jdbc:mysql://%s:%d/", dbHost, dbPort);  
    }  
  
    /** 
     * 创建需要的数据库 
     */  
    public void prepareDatabase() {  
        try {  
            Class.forName("com.mysql.jdbc.Driver");  
  
            // 连接已经存在的数据库，如：mysql  
            Connection connection = DriverManager.getConnection(getDbUrl(), dbUsername, dbPassword);  
            Statement statement = connection.createStatement();  
            
            statement.executeUpdate("create database if not exists dva default character set utf8;");
            statement.close();
            connection.close();
            
            
            // 创建数据库  
         
            
            String url = "jdbc:mysql://localhost:3306/dva?useUnicode=true&characterEncoding=utf-8";  
            connection = DriverManager.getConnection(url, dbUsername, dbPassword);
            statement = connection.createStatement();
            System.out.println("2222222222222");
            System.out.println("(");
            Statement stmt = null;
            String table_user = " CREATE TABLE IF NOT EXISTS user ( UserId varchar(45) ,UserName varchar(45) , UserPwd varchar(45) DEFAULT NULL, BirthDate varchar(45) DEFAULT NULL, Height float DEFAULT NULL, Weight float DEFAULT NULL,  BMI float DEFAULT NULL, BFR float DEFAULT NULL, Sex varchar(45) DEFAULT NULL, Email varchar(45) DEFAULT NULL, AccountNonLocked bool DEFAULT '0', Enabled bool DEFAULT '0', EnableCode varchar(45) DEFAULT NULL, ExpirationDate varchar(45) DEFAULT NULL) ;";
            String table_ex_rec = "CREATE TABLE IF NOT EXISTS Ex_record (RecordID int auto_increment primary key, Exercise_time int(11) NOT NULL,UserID varchar(256) NOT NULL, Date date NOT NULL,Exercise_cal float NOT NULL,ExerciseCategory varchar(50) NOT NULL,ExerciseName varchar(50) NOT NULL) ;";
            String table_ex="CREATE TABLE IF NOT EXISTS Exercise (ExerciseCategory varchar(50) NOT NULL,ExerciseName varchar(50) NOT NULL,Time datetime NOT NULL,Frequency int(11) DEFAULT NULL,Exercise_cal float NOT NULL); ";
            String table_food_rec="CREATE TABLE IF NOT EXISTS Food_record (RecordID int auto_increment primary key,UserID varchar(256) NOT NULL,Date datetime NOT NULL,FoodCategory varchar(30) NOT NULL,Food_weight float NOT NULL,Foodname varchar(50) NOT NULL,Food_cal float NOT NULL) ;";
            String table_food="CREATE TABLE IF NOT EXISTS Food (FoodCategory varchar(30) NOT NULL, Foodname varchar(50) NOT NULL,Food_weight float NOT NULL,Food_cal float NOT NULL);";
            String l1 = "CREATE database IF NOT EXISTS dvamvn; ";
            statement.executeUpdate(l1);
            String DB_URL = "jdbc:mysql://localhost/dvamvn";
            connection = DriverManager.getConnection(DB_URL, dbUsername, dbPassword);
            System.out.println("Connected database successfully...");
            System.out.println("Creating table in given database...");
            stmt = connection.createStatement();
            
            String sql = "CREATE TABLE REGISTRATION " +
                         "(id INTEGER not NULL, " +
                         " first VARCHAR(255), " + 
                         " last VARCHAR(255), " + 
                         " age INTEGER, " + 
                         " PRIMARY KEY ( id ))"; 

            stmt.executeUpdate(table_user);
            stmt.executeUpdate(table_food);
            stmt.executeUpdate(table_food_rec);
            stmt.executeUpdate(table_ex);
            stmt.executeUpdate(table_ex_rec);
            System.out.println("Created table in given database...");
            System.out.println("00000000000000000000");
            statement.close();  
            connection.close();  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
    }  
}  

