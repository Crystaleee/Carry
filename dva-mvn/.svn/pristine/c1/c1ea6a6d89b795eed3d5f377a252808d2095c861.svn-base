package edu.bupt.dmg.dao;

import java.util.List;

import edu.bupt.dmg.domain.Authority;
/**
 * 权限的数据接入层接口
 * 
 * Project Name: VisAna<br> 
 * File Name: AuthorityDao.java<br> 
 * Package Name: edu.bupt.dmg.dao<br>       
 * Creator: @author Ruitong Chai & Bohao Wang<br>    
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public interface AuthorityDao extends Dao<Authority> {
	/**
	 * 通过roleId来获取权限集合
	 * @param roleId 角色ID
	 * @return
	 */
	public List<Authority> findByRoleId(String roleId);
}
