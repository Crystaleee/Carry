package edu.bupt.dmg.service.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.bupt.dmg.adapter.FileAdapter;
import edu.bupt.dmg.dao.ExerciseRecordDao;
import edu.bupt.dmg.dao.FoodRecordDao;
import edu.bupt.dmg.dao.UploadFileDao;
import edu.bupt.dmg.domain.ExerciseRecord;
import edu.bupt.dmg.domain.FoodRecord;
import edu.bupt.dmg.domain.UploadFile;
import edu.bupt.dmg.domain.User;
import edu.bupt.dmg.formbean.FileVo;
import edu.bupt.dmg.formbean.Table;
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
//	@Override
//	public List<FoodRecord> findFoodFilesByUserId(String userId){
//		return (List<FoodRecord>) foodRecordDao.findById(userId);
//	}

}

