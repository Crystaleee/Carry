package edu.bupt.dmg.test;

import org.junit.Test;

import edu.bupt.dmg.adapter.impl.MysqlDBAdapter;

public class DBTest {
	@Test
	public void mysqlAdapteTest() {
		MysqlDBAdapter ma=new MysqlDBAdapter();
		System.out.println(ma.getTableNameList("jdbc:mysql://10.103.244.15:3306/dva", "root", "123456"));
	}
	
}
