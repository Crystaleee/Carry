package edu.bupt.dmg.service;

import edu.bupt.dmg.domain.User;

/**
 * 用户操作的业务逻辑层接口 
 * 
 * Project Name: VisAna<br>
 * File Name: UserService.java<br>
 * Package Name: edu.bupt.dmg.service<br>
 * Creator: @author Ruitong Chai & Bohao Wang<br>
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public interface UserService {
	/**
	 * 用户验证
	 * 
	 * @param userId
	 *            用户ID
	 * @param password
	 *            密码
	 * @return 若用户存在且密码正确，返回true，否则返回false
	 */
	public boolean userValidation(String userId, String password);

	/**
	 * 通过用户ID获得用户对象
	 * 
	 * @param userId
	 *            用户ID
	 * @return 用户对象
	 */
	public User getUserByUserId(String userId);

	/**
	 * 增加一个用户
	 * 
	 * @param user
	 *            用户对象
	 * @return 增加成功返回true，否则返回false
	 */
	public boolean createUser(User user);

	/**
	 * 用户修改密码（仅作测试使用，正式使用需验证原密码）
	 * 
	 * @param userId
	 * @param newPassword
	 * @return
	 */
	@Deprecated
	public boolean modifyPassword(String userId, String newPassword);

	/**
	 * 激活用户
	 * 
	 * @param user
	 *            用户对象
	 * @return 激活成功返回true，否则返回false
	 */
	public boolean activateUser(User user);

	/**
	 * 通过Email返回用户对象
	 * 
	 * @param email
	 * @return
	 */
	public User getUserByEmail(String email);
}
