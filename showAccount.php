<?php 
	header('content-type:text/html;charset="utf-8"');
	//1、链接数据库
	$con = mysql_connect('localhost', 'root', '123456');
	if(!$con){
		echo "error";
		exit;
	}else{
		echo "success";
	}

	//2、选择操作的数据库
	mysql_select_db('qd1701_db');
	//3、拼接sql语句
	$sql = 'SELECT * FROM student ORDER BY math DESC';
	//4、发送sql语句，执行返回结果
	$res = mysql_query($sql);
	echo '<pre>';
	//查看一下返回值
	//var_dump($res);

	//5、获取结果，并展示，用表格
	//通过echo 输出到页面的文本 相当于JS中document.wirte()，会自动将标签尽心高解析

	echo "<table border = '1px' width = '400px'>";
	//表头  字段
	echo "<tr><th>学生编号</th><th>学生姓名</th><th>中文成绩</th><th>英语成绩</th><th>数学成绩</th></tr>";
	
	//将返回的数据中的每一条记录获取出来
	while($row =  mysql_fetch_assoc($res)){
		//$row 就是返回的每一条记录 这是一个关联数组 类似于对象
		echo "<tr><td>{$row['id']}</td><td>{$row['name']}</td><td>{$row['chinese']}</td><td>{$row['english']}</td><td>{$row['math']}</td></tr>";
	}


	echo "</table>";
 ?>