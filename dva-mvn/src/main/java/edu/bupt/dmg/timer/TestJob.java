package edu.bupt.dmg.timer;

import org.springframework.beans.factory.annotation.Autowired;
import edu.bupt.dmg.dao.UserDao;

public class TestJob {
	@Autowired
	UserDao userDao;

	public boolean execute() {
		try {
			userDao.updatedatebase();
			System.out.println("!");

		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
		return true;
	}
}
