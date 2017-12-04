package edu.bupt.dmg.dao;

import java.io.Serializable;
import java.util.List;

import edu.bupt.dmg.domain.*;
/**
 * 用户的数据接入层接口
 * 
 * Project Name: VisAna<br> 
 * File Name: UserDao.java<br> 
 * Package Name: edu.bupt.dmg.dao<br>       
 * Creator: @author Qiuyuan Song<br>    
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public interface ExerciseRecordDao extends Dao<ExerciseRecord>{
	/**
	 * 通过RecordID查找ExerciseRecord
	 * @param RecordID
	 * @return
	 */
	public ExerciseRecord findByRecordID(String RecordID);
	public List<ExerciseRecord> findRecById(String id);
	public void updatedatebase();
	public void deleteByDate(String date);
}
