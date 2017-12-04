package edu.bupt.dmg.dao;

import java.io.Serializable;
import java.util.List;
/**
 * 标准数据接入层接口，所有数据接入层接口继承此接口
 * 
 * Project Name: VisAna<br> 
 * File Name: Dao.java<br> 
 * Package Name: edu.bupt.dmg.dao<br>       
 * Creator: @author Ruitong Chai & Bohao Wang<br>    
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public interface Dao<T> {
	/**
	 * 插入对象
	 * 
	 * @param t
	 *            持久化对象，插入表名一般与类名保持一致（首字母小写）
	 * @throws Exception
	 *             主键相同或其它原因导致插入异常，由service层处理
	 * 
	 */
	public void insert(T t) throws Exception;

	/**
	 * 更新对象
	 * 
	 * @param t
	 *            持久化对象
	 * @throws Exception
	 *             更新失败异常
	 */
	public void update(T t) throws Exception;

	/**
	 * 根据主键查找对象
	 * 
	 * @param id
	 *            主键值，类型为Serializable可以传入int也可以传入字符串
	 * @return 返回查找到的对象，若返回值为null，则表示表中没有主键值为id的项
	 */
	public T findById(Serializable id);

	/**
	 * 根据主键删除对象
	 * 
	 * @param id主键值，类型为Serializable可以传入int也可以传入字符串
	 * @throws Exception
	 *             通常原因为删除该项导致表的级联产生的外键约束不符
	 */
	public void deleteById(Serializable id) throws Exception;

	/**
	 * 查找表中所有项
	 * 
	 * @return 包含所有项的模型列表
	 */
	public List<T> findAll();
	

	/**
	 * 根据条件查找表中的所有项
	 * 
	 * @param fileId
	 *            将查找条件封装在模型中，无要求的属性值为null，有要求的则为要求值
	 * @return 符合条件的模型列表
	 */
	

}
