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
            String table_ex_rec = "CREATE TABLE IF NOT EXISTS Ex_record (Cal varchar(20) NOT NULL, RecordID int auto_increment primary key, Exercise_time varchar(45) NOT NULL,	UserID varchar(45) NOT NULL, Date varchar(45) NOT NULL,Exercise_category varchar(50) NOT NULL) ;";
            String drop_ex="drop table if exists Exercise;";
            String drop_food="drop table if exists Food;";
            String insert_ex="insert into Exercise(ExName,Ex_cal) VALUES('Swimming','400'),('Basketball','500'),('Fitness','550'),('Soccer','588'),('Jogging','600'),('Bicycling','330'),('Rope skipping','800'),('Squash','1000'),('Tennis','425'),('Volleyball','294');";
            String insert_food="insert into Food(FoodName, Food_cal)VALUES('Egg','86'),('Pork','241'),('Steak','250'),('Chicken','239'),('Broccoli','33.7'),('Carrot','41.3'),('Mushroom','22.2'),('Apple','54'),('Banana','88.7'),('Watermelon','30.4'),('Coca','37.5');";
            String table_ex="CREATE TABLE IF NOT EXISTS Exercise (ExName varchar(20) NOT NULL,Ex_cal  varchar(20) NOT NULL); ";
            String table_food_rec="CREATE TABLE IF NOT EXISTS Food_record (Cal varchar(20) NOT NULL, RecordID int auto_increment primary key, UserID varchar(256) NOT NULL,Date varchar(256) NOT NULL,Food_category varchar(50) NOT NULL,Food_weight varchar(50) NOT NULL) ;";
            String table_food="CREATE TABLE IF NOT EXISTS Food (FoodName varchar(20) NOT NULL,Food_cal varchar(20) NOT NULL);";
            String l1 = "CREATE database IF NOT EXISTS dvamvn; ";
            statement.executeUpdate(l1);
            String DB_URL = "jdbc:mysql://localhost/dvamvn";
            connection = DriverManager.getConnection(DB_URL, dbUsername, dbPassword);
            System.out.println("Connected database successfully...");
            System.out.println("Creating table in given database...");
            stmt = connection.createStatement();
            

            stmt.executeUpdate(drop_food);
            stmt.executeUpdate(drop_ex);
            stmt.executeUpdate(table_user);
            stmt.executeUpdate(table_food);
            stmt.executeUpdate(table_food_rec);
            stmt.executeUpdate(table_ex);
            stmt.executeUpdate(table_ex_rec);
            stmt.executeUpdate(insert_food);
            stmt.executeUpdate(insert_ex);
            System.out.println("Created table in given database...");
         
            statement.close();  
            connection.close();  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
    }  
}  

