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
            //String drop_ex_rec="drop table if exists Ex_record;";
            //String drop_food_rec="drop table if exists Food_record;";
            String drop_food="drop table if exists Food;";
            String insert_ex="insert into Exercise(ExName,Ex_cal) VALUES('Swimming','400'),('Basketball','500'),('Fitness','550'),('Soccer','588'),('Jogging','600'),('Bicycling','330'),('Rope skipping','800'),('Squash','1000'),('Tennis','425'),('Volleyball','294');";
            String insert_food="insert into Food(FoodName, Food_cal)VALUES('Egg','86'),('Pork','241'),('Steak','250'),('Chicken','239'),('Broccoli','33.7'),('Carrot','41.3'),('Mushroom','22.2'),('Apple','54'),('Banana','88.7'),('Watermelon','30.4'),('Coca','37.5');";
            String insert_ex_rec="insert into Ex_record(Cal,\n" + 
            		"Exercise_time,\n" + 
            		"UserID,\n" + 
            		"Date,\n" + 
            		"Exercise_category) VALUES \n" + 
            		"('400' ,'1' ,'bobby','2017-12-04','Swimming' ),\n" + 
            		"('500' ,'0.5' ,'bobby','2017-12-03','Basketball'),\n" + 
            		"('825' ,'1.5' ,'bobby','2017-12-02','Fitness' ),\n" + 
            		"('588' ,'1' ,'bobby','2017-12-01','Soccer' ),\n" + 
            		"('300' ,'0.5' ,'bobby','2017-11-30','Jogging' ),\n" + 
            		"('495' ,'1.5' ,'bobby','2017-11-29','Bicycling' ),\n" + 
            		"('800' ,'1' ,'bobby','2017-11-28','Rope skipping' ),\n" + 
            		"('500' ,'0.5' ,'bobby','2017-11-27','Squash ' ),\n" + 
            		"('850' ,'1.5' ,'bobby','2017-11-26','Tennis' ),\n" + 
            		"('294' ,'1' ,'bobby','2017-11-25','Volleyball' ),\n" + 
            		"('200' ,'0.5' ,'bobby','2017-11-24','Swimming' ),\n" + 
            		"('750','1.5' ,'bobby','2017-11-23','Basketball' ),\n" + 
            		"('550','1' ,'bobby','2017-11-22','Fitness' ),\n" + 
            		"('294' ,'0.5' ,'bobby','2017-11-21','Soccer' ),\n" + 
            		"('900' ,'1.5' ,'bobby','2017-11-20','Jogging' ),\n" + 
            		"('495' ,'1' ,'bobby','2017-11-19','Bicycling' ),\n" + 
            		"('400' ,'0.5' ,'bobby','2017-11-18','Rope skipping' ),\n" + 
            		"('1500','1.5' ,'bobby','2017-11-17','Squash' ),\n" + 
            		"('425' ,'1' ,'bobby','2017-11-16','Tennis' ),\n" + 
            		"('147','0.5' ,'bobby','2017-11-15','Volleyball' ),\n" + 
            		"('600','1.5' ,'bobby','2017-11-14','Swimming' ),\n" + 
            		"('500','1' ,'bobby','2017-11-13','Basketball' ),\n" + 
            		"('225' ,'0.5' ,'bobby','2017-11-12','Fitness' ),\n" + 
            		"('882' ,'1.5' ,'bobby','2017-11-11','Soccer' ),\n" + 
            		"('600' ,'1' ,'bobby','2017-11-10','Jogging' ),\n" + 
            		"('165' ,'0.5' ,'bobby','2017-11-09','Bicycling' ),\n" + 
            		"('1200' ,'1.5' ,'bobby','2017-11-08','Rope skipping' ),\n" + 
            		"('1000' ,'1' ,'bobby','2017-10-07','Squash'),\n" + 
            		"('212.5','0.5' ,'bobby','2017-10-06','Tennis'),\n" + 
            		"('588' ,'1.5' ,'bobby','2017-10-05','Volleyball'),\n" + 
            		"('400' ,'1' ,'bobby','2017-10-04','Swimming'),\n" + 
            		"('250' ,'0.5' ,'bobby','2017-10-03','Basketball'),\n" + 
            		"('825' ,'1.5' ,'bobby','2017-10-02','Fitness'),\n" + 
            		"('588' ,'1' ,'bobby','2017-10-01','Soccer' ),\n" + 
            		"('300' ,'0.5' ,'bobby','2017-10-08','Jogging' ),\n" + 
            		"('495' ,'1.5' ,'bobby','2017-10-09','Bicycling' ),\n" + 
            		"('800' ,'1' ,'bobby','2017-10-10','Rope skipping' ),\n" + 
            		"('500' ,'0.5' ,'bobby','2017-10-11','Squash' ),\n" + 
            		"('850' ,'1.5' ,'bobby','2017-10-12','Tennis' );";
            String insert_food_rec="insert into Food_record(Cal,\n" + 
            		"UserID,\n" + 
            		"Date,\n" + 
            		"Food_category,\n" + 
            		"Food_weight) VALUES \n" + 
            		"('86' , 'bobby','2017-12-04','Egg','100'),\n" + 
            		"('120.5'  ,'bobby','2017-12-03','Pork','50'),\n" + 
            		"('375'  ,'bobby','2017-12-02','Steak','150' ),\n" + 
            		"('239' ,'bobby','2017-12-01','Chicken' ,'100'),\n" + 
            		"('16.85'  ,'bobby','2017-11-30','Broccoli','50' ),\n" + 
            		"('61.95'  ,'bobby','2017-11-29','Carrot' ,'150' ),\n" + 
            		"('22.2'  ,'bobby','2017-11-28','Mushroom' ,'100'),\n" + 
            		"('27'  ,'bobby','2017-11-27','Apple','50' ),\n" + 
            		"('133.05' ,'bobby','2017-11-26','Banana','150'  ),\n" + 
            		"('30.4' ,'bobby','2017-11-25','Watermelon' ,'100'),\n" + 
            		"('43' ,'bobby','2017-11-24','Egg','50' ),\n" + 
            		"('361.5' ,'bobby','2017-11-23','Pork','150'  ),\n" + 
            		"('250','bobby','2017-11-22','Steak','100' ),\n" + 
            		"('119.5' ,'bobby','2017-11-21','Chicken','50' ),\n" + 
            		"('50.55' ,'bobby','2017-11-20','Broccoli','150'  ),\n" + 
            		"('41.3' ,'bobby','2017-11-19','Carrot' ,'100'),\n" + 
            		"('30.975' ,'bobby','2017-11-18','Mushroom','50' ),\n" + 
            		"('81' ,'bobby','2017-11-17','Apple','150'  ),\n" + 
            		"('88.7'  ,'bobby','2017-11-16','Banana' ,'100'),\n" + 
            		"('15.2' ,'bobby','2017-11-15','Watermelon' ,'50'),\n" + 
            		"('129','bobby','2017-11-14','Egg' ,'150' ),\n" + 
            		"('241','bobby','2017-11-13','Pork' ,'100'),\n" + 
            		"('125'  ,'bobby','2017-11-12','Steak','50' ),\n" + 
            		"('358.5'  ,'bobby','2017-11-11','Chicken','150'),\n" + 
            		"('33.7' ,'bobby','2017-11-10','Broccoli','100'),\n" + 
            		"('20.65'  ,'bobby','2017-11-09','Carrot' ,'50'),\n" + 
            		"('92.925'  ,'bobby','2017-11-08','Mushroom','150'  ),\n" + 
            		"('54' ,'bobby','2017-10-07','Apple','100'),\n" + 
            		"('44.35','bobby','2017-10-06','Banana','50'),\n" + 
            		"('45.6'  ,'bobby','2017-10-05','Watermelon','150' ),\n" + 
            		"('86' ,'bobby','2017-10-04','Egg','100'),\n" + 
            		"('120.5'  ,'bobby','2017-10-03','Pork','50'),\n" + 
            		"('375'  ,'bobby','2017-10-02','Steak','150' ),\n" + 
            		"('239'  ,'bobby','2017-10-01','Chicken','100' ),\n" + 
            		"('16.85' ,'bobby','2017-10-08','Broccoli','50' ),\n" + 
            		"('61.95'  ,'bobby','2017-10-09','Carrot','150'  ),\n" + 
            		"('22.2' ,'bobby','2017-10-10','Mushroom','100'),\n" + 
            		"('27' ,'bobby','2017-10-11','Apple','50' ),\n" + 
            		"('18.75'  ,'bobby','2017-10-12','Coca','50' ),\n" + 
            		"('37.5' ,'bobby','2017-10-13','Coca' ,'100'),\n" + 
            		"('56.25' ,'bobby','2017-10-14','Coca' ,'150' );";
            
            
            
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
            //stmt.executeUpdate(drop_ex_rec);
            stmt.executeUpdate(table_user);
            stmt.executeUpdate(table_food);
            stmt.executeUpdate(table_food_rec);
            stmt.executeUpdate(table_ex);
            stmt.executeUpdate(table_ex_rec);
            stmt.executeUpdate(insert_food);
            stmt.executeUpdate(insert_ex);
            stmt.executeUpdate(insert_ex_rec);
            stmt.executeUpdate(insert_food_rec);
            System.out.println("Created table in given database...");
         
            statement.close();  
            connection.close();  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
    }  
}  

