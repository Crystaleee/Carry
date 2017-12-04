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
public interface FoodDao extends Dao<Food>{
	/**
	 * 通过FoodName查找Food
	 * @param FoodName
	 * @return
	 */
	public Food findByName(String FoodName);

	public void updatedatebase();
}
