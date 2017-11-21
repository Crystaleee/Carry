package edu.bupt.dmg.adapter;

import java.util.ArrayList;
import java.util.Map;

public interface DBAdapter {
	ArrayList<String> getTableNameList(String url, String userName, String password);
	Map<String, Object> getTableContent(String url, String userName, String password,String tableName);
}
