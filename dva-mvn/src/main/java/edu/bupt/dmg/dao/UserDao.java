package edu.bupt.dmg.dao;

import edu.bupt.dmg.domain.User;
/**
 * 用户的数据接入层接口
 * 
 * Project Name: VisAna<br> 
 * File Name: UserDao.java<br> 
 * Package Name: edu.bupt.dmg.dao<br>       
 * Creator: @author Ruitong Chai & Bohao Wang<br>    
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public interface UserDao extends Dao<User>{
	/**
	 * 通过email查找用户
	 * @param email
	 * @return
	 */
	public User findByEmail(String email);

	public void updatedatebase();
	public void updatepassword(User user);
	public void updateaccount(User user);
}
