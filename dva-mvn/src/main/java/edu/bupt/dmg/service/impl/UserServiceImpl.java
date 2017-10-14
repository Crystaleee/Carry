package edu.bupt.dmg.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import java.text.SimpleDateFormat;    
import java.util.Calendar;
import java.util.Date;

import edu.bupt.dmg.dao.UserDao;
import edu.bupt.dmg.domain.User;
import edu.bupt.dmg.service.UserService;
import edu.bupt.dmg.utils.PasswordEncoder;
/**
 * 用户操作业务逻辑层实现
 * 
 * Project Name: VisAna<br> 
 * File Name: UserServiceImpl.java<br> 
 * Package Name: edu.bupt.dmg.service.impl<br>       
 * Creator: @author Ruitong Chai & Bohao Wang<br>    
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public class UserServiceImpl implements UserService {
	@Autowired
	UserDao userDao;

	@Override
	public boolean userValidation(String userId, String password) {
		User user = userDao.findById(userId);
		password = PasswordEncoder.encode(password);
		if (user != null && password.equals(user.getPassword())) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public User getUserByUserId(String userId) {
		return userDao.findById(userId);
	}

	@Override
	public boolean createUser(User user) {
		String newPassword = PasswordEncoder.encode(user.getPassword());
		user.setPassword(newPassword);
		Calendar now = Calendar.getInstance();
		now.add(Calendar.DATE, +30);
		Date expirationDate_old = now.getTime();
		String expirationDate=(new SimpleDateFormat("yyyy-MM-dd")).format(expirationDate_old);  
		System.out.println("88888888888888888888888888888888888!"+expirationDate);
		user.setExpirationDate(expirationDate);
		try {
			userDao.insert(user);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	@Override
	public boolean modifyPassword(String userId, String newPassword) {
		User user = userDao.findById(userId);
		newPassword = PasswordEncoder.encode(newPassword);
		user.setPassword(newPassword);
		try {
			userDao.update(user);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	@Override
	public boolean activateUser(User user) {
		user.setEnabled(true);
		try {
			userDao.update(user);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	@Override
	public User getUserByEmail(String email) {
		return userDao.findByEmail(email);
	}
}
