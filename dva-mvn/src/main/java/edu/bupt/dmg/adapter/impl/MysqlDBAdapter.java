package edu.bupt.dmg.adapter.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import edu.bupt.dmg.adapter.DBAdapter;

public class MysqlDBAdapter implements DBAdapter {

	@Override
	public ArrayList<String> getTableNameList(String url, String userName, String password) {
		Connection conn = getConnection(url, userName, password);
		String pstmt = "show tables";
		try {
			Statement sql = conn.createStatement();
			ResultSet res = sql.executeQuery(pstmt);
			ArrayList<String> tableNameList = new ArrayList<String>();
			while (res.next()) {
				tableNameList.add(res.getString(1));
			}
			return tableNameList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			closeConnection(conn);
		}
	}

	private Connection getConnection(String url, String userName, String password) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			return DriverManager.getConnection(url, userName, password);
		} catch (Exception e) {
			return null;
		}
	}

	private void closeConnection(Connection conn) {
		if (conn != null) {
			try {
				conn.close();
			} catch (Exception e) {
			}
		}
	}

	@Override
	public Map<String, Object> getTableContent(String url, String userName, String password, String tableName) {
		Connection conn = getConnection(url, userName, password);
		String stmt = "select * from " + tableName;
		try {
			Statement sql = conn.createStatement();
			ResultSet res = sql.executeQuery(stmt);
			Map<String, Object> content = new HashMap<String, Object>();
			ArrayList<String> columns = new ArrayList<String>();
			for (int i = 0; i < res.getMetaData().getColumnCount(); i++) {
				columns.add(res.getMetaData().getColumnName(i + 1));
			}
			content.put("columns", columns);
			ArrayList<ArrayList<String>> values = new ArrayList<ArrayList<String>>();
			while (res.next()) {
				ArrayList<String> value = new ArrayList<String>();
				for (String col : columns) {
					value.add(res.getString(col));
				}
				values.add(value);
			}
			content.put("values", values);
			return content;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			closeConnection(conn);
		}
	}

}
