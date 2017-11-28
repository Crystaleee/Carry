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
		System.out.println("here");
		String newPassword = PasswordEncoder.encode(user.getPassword());
		user.setPassword(newPassword);
		Calendar now = Calendar.getInstance();
		now.add(Calendar.DATE, +30);
		Date expirationDate_old = now.getTime();
		String expirationDate=(new SimpleDateFormat("yyyy-MM-dd")).format(expirationDate_old);  
		System.out.println("88888888888888888888888888888888888!"+expirationDate);
		user.setExpirationDate(expirationDate);
		try {
			
			System.out.println(user.getPassword());
			System.out.println(user.getUserId());
			System.out.println(user.getName());
			userDao.insert(user);
		} catch (Exception e) {
			System.out.println("error:"+e);
			
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
	public boolean updateProfile(User user) {
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
	
    @Override
    public  int getAge(Date birthDay) {
        Calendar cal = Calendar.getInstance();
        
        if (cal.before(birthDay)) {
            throw new IllegalArgumentException(
                                               "The birthDay is before Now.It's unbelievable!");
        }
        int yearNow = cal.get(Calendar.YEAR);
        int monthNow = cal.get(Calendar.MONTH);
        int dayOfMonthNow = cal.get(Calendar.DAY_OF_MONTH);
        cal.setTime(birthDay);
        
        int yearBirth = cal.get(Calendar.YEAR);
        int monthBirth = cal.get(Calendar.MONTH);
        int dayOfMonthBirth = cal.get(Calendar.DAY_OF_MONTH);
        
        int age = yearNow - yearBirth;
        
        if (monthNow <= monthBirth) {
            if (monthNow == monthBirth) {
                if (dayOfMonthNow < dayOfMonthBirth) age--;
            }else{
                age--;
            }
        }
        return age;
    }
    
    @Override
    public boolean updatePassword(User user){
    	try{
    		userDao.updatepassword(user);
    	}catch(Exception e){
    		return false;
    	}
    	return true;
    }
}
