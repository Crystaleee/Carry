package edu.bupt.dmg.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.bupt.dmg.adapter.DBAdapter;
import edu.bupt.dmg.commons.ResultMessage;

@Controller
@RequestMapping(value = "/db")
public class DBAction {
	@Autowired
	HashMap<String, DBAdapter> dbAdapterMap;

	@RequestMapping(value = "/getTables")
	public @ResponseBody Map<String, Object> getTables(String dbType, String ipAddress, String port, String dbName,
			String userName, String password) throws Exception {
		Map<String, Object> responseMap = new HashMap<>();
		if (dbType.toLowerCase().equals("mysql")) {
			String url = "jdbc:mysql://" + ipAddress + ":" + port + "/" + dbName;
			ArrayList<String> tables = dbAdapterMap.get("mysql").getTableNameList(url, userName, password);
			if (tables != null) {
				responseMap.put("resultMessage", new ResultMessage(1));
				responseMap.put("tables", tables);
				return responseMap;
			} else {
				responseMap.put("resultMessage", new ResultMessage(-12));
				return responseMap;
			}
		} else {
			responseMap.put("resultMessage", new ResultMessage(-12));
			return responseMap;
		}
	}
	
	@RequestMapping(value = "/saveTables")
	public @ResponseBody Map<String, Object> saveTables(String dbType, String ipAddress, String port, String dbName,
			String tables, String userName, String password) throws Exception {
		Map<String, Object> responseMap = new HashMap<>();
		// TODO: save the info of tables that user needed
		return responseMap;
	}

	@RequestMapping(value = "/getTableContents")
	public @ResponseBody Map<String, Object> getTableContents(String dbType, String ipAddress, String port,
			String dbName, String userName, String password, String tableName) throws Exception {
		Map<String, Object> responseMap = new HashMap<>();
		if (dbType.toLowerCase().equals("mysql")) {
			String url = "jdbc:mysql://" + ipAddress + ":" + port + "/" + dbName;
			Map<String, Object> tableContent = dbAdapterMap.get("mysql").getTableContent(url, userName, password,
					tableName);
			if (tableContent != null) {
				responseMap.put("resultMessage", new ResultMessage(1));
				responseMap.put("tableContent", tableContent);
				return responseMap;
			} else {
				responseMap.put("resultMessage", new ResultMessage(-12));
				return responseMap;
			}
		} else {
			responseMap.put("resultMessage", new ResultMessage(-12));
			return responseMap;
		}
	}

}
