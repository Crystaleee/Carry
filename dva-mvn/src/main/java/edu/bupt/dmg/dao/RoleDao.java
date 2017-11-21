package edu.bupt.dmg.dao;

import java.util.List;

import edu.bupt.dmg.domain.Role;
/**
 * 角色的数据接入层接口
 * 
 * Project Name: VisAna<br> 
 * File Name: RoleDao.java<br> 
 * Package Name: edu.bupt.dmg.dao<br>       
 * Creator: @author Ruitong Chai & Bohao Wang<br>    
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public interface RoleDao extends Dao<Role> {
	/**
	 * 通过用户ID查找对应的角色集合
	 * @param userId 用户ID
	 * @return
	 */
	public List<Role> findByUserId(String userId);
}
