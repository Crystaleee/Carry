package edu.bupt.dmg.dao;

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
public interface FoodRecordDao extends Dao<FoodRecord>{
	/**
	 * 通过RecordID查找FoodRecord
	 * @param RecordID
	 * @return
	 */
	public FoodRecord findByRecordID(String RecordID);
	public List<FoodRecord> findRecById(String id);
	public void updatedatebase();
}
