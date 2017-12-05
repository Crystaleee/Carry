package edu.bupt.dmg.service.impl;


import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;


import edu.bupt.dmg.adapter.FileAdapter;
import edu.bupt.dmg.dao.ExerciseDao;
import edu.bupt.dmg.dao.ExerciseRecordDao;
import edu.bupt.dmg.dao.FoodDao;
import edu.bupt.dmg.dao.FoodRecordDao;

import edu.bupt.dmg.domain.Exercise;
import edu.bupt.dmg.domain.ExerciseRecord;
import edu.bupt.dmg.domain.Food;
import edu.bupt.dmg.domain.FoodRecord;

import edu.bupt.dmg.service.FileService;

/**
 * 文件操作业务逻辑层实现
 * 
 * Project Name: VisAna<br>
 * File Name: FileServiceImpl.java<br>
 * Package Name: edu.bupt.dmg.service.impl<br>
 * Creator: @author Ruitong Chai & Bohao Wang<br>
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public class FileServiceImpl implements FileService {
	@Autowired
	ExerciseRecordDao exerciseRecordDao;
	@Autowired
	FoodRecordDao foodRecordDao;
	@Autowired
	FoodDao foodDao;
	@Autowired
	ExerciseDao exerciseDao;
	@Autowired
	HashMap<String, FileAdapter> adapterMap;


	
	@Override
	public boolean createExeRec(ExerciseRecord exerciseRecord ){
		try{
			System.out.println("?id?:>"+exerciseRecord.getUserID());
			System.out.println("?cat?:>" + exerciseRecord.getExercise_category());
			System.out.println("?time?:>" + exerciseRecord.getExercise_time());
			System.out.println("?date?:>" + exerciseRecord.getDate());
			exerciseRecordDao.insert(exerciseRecord);
			System.out.println("bbbbbbbbbbbbbbbbbbb");
		}
		catch(Exception e){
			System.out.println("nononononono");
			e.printStackTrace(); 
			return false;
		}
		return true;
	}
	@Override
	public boolean createFoodRec(FoodRecord foodRecord){
		try{
			System.out.println("??id"+ foodRecord.getUserID());
			System.out.println("??cat"+ foodRecord.getFood_category());
			System.out.println("??date"+foodRecord.getDate());
			foodRecordDao.insert(foodRecord);
			System.out.println("niceeee!");
		}
		catch(Exception e){
			System.out.println("FOOOOOO");
			return false;
		}
		return true;
	}
	@Override
	public List<ExerciseRecord> findExeFilesByUserId(String userId){
		return  exerciseRecordDao.findRecById(userId);
	}
	@Override
	public List<FoodRecord> findFoodFilesByUserId(String userId){
		return  foodRecordDao.findRecById(userId);
	}
	@Override
	public boolean deleteExeFilesByDate(String date){
		try{
			exerciseRecordDao.deleteByDate(date);
		}catch(Exception e){
			return false;
		}
		return true;
	}
	@Override
	public boolean deleteFoodFilesByDate(String date){
		try{
			foodRecordDao.deleteByDate(date);
		}catch(Exception e){
			return false;
		}
		return true;
	}
	@Override
	public String getExeTotalCal(String category, String time){
		String[] resultCategory=category.split(",");
		String[] resultTime=time.split(",");
		for(int i=0;i<resultCategory.length;i++){
			System.out.println(i+" : "+resultCategory[i]);
		}
		for(int i=0;i<resultTime.length;i++){
			System.out.println(i+" : "+resultTime[i]);
		}
		
		double product= 0;
		for(int i=0;i<resultCategory.length;i++){
			Exercise exe = exerciseDao.findByName(resultCategory[i]);
			System.out.println("exe.getEx_cal(): "+exe.getEx_cal());
			System.out.println("resultTime: "+resultTime[i]);
			product =product+Double.valueOf(exe.getEx_cal()) * Double.valueOf(resultTime[i]);
		}
		return Double.toString(product);
	}
	@Override
	public String getFoodTotalCal(String category, String time){
		String[] resultCategory=category.split(",");
		String[] resultTime=time.split(",");
		double product= 0;
		for(int i=0;i<resultCategory.length;i++){
			System.out.println("????resultCategory[i]: "+resultCategory[i]);
			Food food = foodDao.findByName(resultCategory[i]);
			
			System.out.println("food.getFood_cal():"+food.getFood_cal());
			System.out.println("resultTime[i]: "+resultTime[i]);
			product =product+Double.valueOf(food.getFood_cal()) * Double.valueOf(resultTime[i]);
		}
		return Double.toString(product);
	}
}

