package edu.bupt.dmg.dao;

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
public interface ExerciseDao extends Dao<Exercise>{
	/**
	 * 通过ExName查找Exercise
	 * @param ExName
	 * @return
	 */
	public Exercise findByName(String ExName);

	public void updatedatebase();
}
