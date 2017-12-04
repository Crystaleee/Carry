package edu.bupt.dmg.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;


import edu.bupt.dmg.domain.ExerciseRecord;
import edu.bupt.dmg.domain.FoodRecord;
import edu.bupt.dmg.domain.UploadFile;
import edu.bupt.dmg.formbean.FileVo;
import edu.bupt.dmg.formbean.Table;

/**
 * 文件操作业务逻辑层接口
 * 
 * Project Name: VisAna<br>
 * File Name: FileService.java<br>
 * Package Name: edu.bupt.dmg.service<br>
 * Creator: @author Ruitong Chai & Bohao Wang<br>
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public interface FileService {


	public boolean createExeRec(ExerciseRecord exerciseRecord );
	public boolean createFoodRec(FoodRecord foodRecord);
	public List<ExerciseRecord> findExeFilesByUserId(String userId);
	public List<FoodRecord> findFoodFilesByUserId(String userId);
	public boolean deleteExeFilesByDate(String date);
	public boolean deleteFoodFilesByDate(String date);
	
}
