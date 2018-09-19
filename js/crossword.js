var question = [
		["cross","千山鸟飞绝","万*人踪灭","径#劲#一#迳","*"],
		["cavil","东临截石","以观沧海","结#一#揭#碣","截"],
		["idiom","风驰电撤","","车#策#扯#掣","撤"],
		["cavil","横看成岭侧成峰","远近高低个不同","哥#歌#各#个","个"],
		["cross","千山鸟飞绝","万*人踪灭","径#劲#一#迳","*"],
		["cavil","东临截石","以观沧海","结#一#揭#碣","截"],
		["cross","山外青山*外楼","西湖歌舞几时休","楼#喽#漏#露","*"],
		["cavil","横看成岭侧成峰","远近高低个不同","哥#歌#各#个","个"],
		["cross","千山鸟飞绝","万*人踪灭","径#劲#一#迳","*"],
		["cavil","东临截石","以观沧海","结#一#揭#碣","截"],
		["cross","山外青山*外楼","西湖歌舞几时休","楼#喽#漏#露","*"],
		["cavil","横看成岭侧成峰","远近高低个不同","哥#歌#各#个","个"],
		["couplet","千山鸟飞绝","*","万径人踪灭#孤舟蓑笠翁#独钓寒江雪#把酒问青天","*"],
		["ident","千一山二鸟三飞四绝","","",""],
		["couplet","*","万径人踪灭","万径人踪灭#千山鸟飞绝#独钓寒江雪#把酒问青天","*"],
		["ident","千六里七江八陵九一十日还","","",""],
	];
function checkQuestion(question){
	var new_question = [];
	for(var i = 0,a = question.length;i < a;i++){
		var t = question[i][0];
		var q1 = question[i][1];
		var q2 = question[i][2];
		var ans = question[i][3];
		var k = question[i][4];
		if(t=="cross" && (q1.length==4 || q1.length==5 || q1.length==7) && (q2.length==q1.length) && ans.split("#").length==4 && k.length==1){
			new_question.push(question[i]);
		}else if(t=="cavil" && (q1.length==4 || q1.length==5 || q1.length==7) && (q2.length==q1.length) && ans.split("#").length==4 &&k.length==1){
			new_question.push(question[i]);
		}else if(t=="idiom" && q1.length==4 && q2.length==0 && ans.split("#").length==4 && k.length==1){
			new_question.push(question[i]);
		}else if(t=="ident" && (q1.length==9 || q1.length==12) && q2.length==0 && ans.length==0 &&k.length==0){
			new_question.push(question[i]);
		}
	}
	return new_question;
}
var cur_num = 0,cur_num1 = 0;
var ct = [20,20,20,20,20,20,20,20,20,20,20,20,20,20,20];
var timer = [];
var error_num = 0;
var user_ans = ["","","","","","","","","","","","","","",""];
function initElm(quest){
	var con = $(".main");
	var cross_item = "<div class='cross_word_item cross'><div class='time_con'><img src='img/icon_time.png' class='icon_time'><div class='s_time_num'>20秒</div></div>" + 
		"<div class='question_tip txt_content2'></div>" + 
		"<div class='question_con'><div class='line1'></div>" + 
		"<div class='line2'></div></div>" + 
		"<div class='answer_tip txt_content1'>请选择：</div><div class='hr_line'></div><div class='answer_con'></div></div>";
	var cavil_item = "<div class='cross_word_item cavil'><div class='time_con'><img src='img/icon_time.png' class='icon_time'><div class='s_time_num'>20秒</div></div>" + 
		"<div class='question_tip txt_content2'></div>" + 
		"<div class='question_con'><div class='line1'></div>" + 
		"<div class='line2'></div></div>" + 
		"<div class='error_tip txt_content2'>对不起，您答错了！<br>还有一次选择机会，请重新选择。</div>" +
		"<div class='answer_tip txt_content1 dis'>请选择正确答案：</div><div class='hr_line dis'></div><div class='answer_con dis'></div></div>";
	var idiom_item = "<div class='cross_word_item idiom'><div class='time_con'><img src='img/icon_time.png' class='icon_time'><div class='s_time_num'>20秒</div></div>" + 
		"<div class='question_tip txt_content2'></div>" + 
		"<div class='question_con'><div class='line1'></div>" + 
		"<div class='line2'></div></div>" + 
		"<div class='error_tip txt_content2'>对不起，您答错了！<br>还有一次选择机会，请重新选择。</div>" +
		"<div class='answer_tip txt_content1 dis'>请选择正确答案：</div><div class='hr_line dis'></div><div class='answer_con dis'></div></div>";
	
	var quest_item1 = "",quest_item2 = "",ans_item;
	for(var a = quest.length,i = 0;i < a;i++){
		if(quest[i][0] == "cross"){
			con.append(cross_item);
			var quest_elm_list = $(".cross_word_item");
			$(quest_elm_list[i]).find(".question_tip").html((i+1) + ".填字题：请填写空白处的字。");
			$(quest_elm_list[i]).find(".s_time_num").html(ct[i] + "秒");
			for(var j = 0,b = quest[i][1].length;j < b;j++){
				quest_item1 = "<div class='que" + b + "'>" + (quest[i][1].split("")[j] == quest[i][4] ? "<img src='img/quest_bg.png' class='bg_img qu'>" : quest[i][1].split("")[j]) + "</div>";
				$(quest_elm_list[i]).find(".line1").append(quest_item1);
				quest_item2 = "<div class='que" + b + "'>" + (quest[i][2].split("")[j] == quest[i][4] ? "<img src='img/quest_bg.png' class='bg_img qu'>" : quest[i][2].split("")[j]) + "</div>";
				$(quest_elm_list[i]).find(".line2").append(quest_item2);
			}
			for(var k = 0,c = quest[i][3].length - 3;k < c;k++){
				ans_item = "<div class='ans'>" + quest[i][3].split("#")[k] + "</div>";
				$(quest_elm_list[i]).find(".answer_con").append(ans_item);
			}
		}else if(quest[i][0] == "cavil"){
			con.append(cavil_item);
			var quest_elm_list = $(".cross_word_item");
			$(quest_elm_list[i]).find(".s_time_num").html(ct[i] + "秒");
			$(quest_elm_list[i]).find(".question_tip").html((i+1) + ".错字题：请找出一个错别字并写出正确答案。");
			for(var j = 0,b = quest[i][1].length;j < b;j++){
				quest_item1 = "<div class='que" + b + "'>" + quest[i][1].split("")[j] + "</div>";
				$(quest_elm_list[i]).find(".line1").append(quest_item1);
				quest_item2 = "<div class='que" + b + "'>" + quest[i][2].split("")[j] + "</div>";
				$(quest_elm_list[i]).find(".line2").append(quest_item2);
			}
			for(var k = 0,c = quest[i][3].length - 3;k < c;k++){
				ans_item = "<div class='ans'>" + quest[i][3].split("#")[k] + "</div>";
				$(quest_elm_list[i]).find(".answer_con").append(ans_item);
			}
		}else if(quest[i][0] == "idiom"){
			con.append(cavil_item);
			var quest_elm_list = $(".cross_word_item");
			$(quest_elm_list[i]).find(".s_time_num").html(ct[i] + "秒");
			$(quest_elm_list[i]).find(".question_tip").html((i+1) + ".错字题：请找出一个错别字并写出正确答案。");
			for(var j = 0,b = quest[i][1].length;j < b;j++){
				quest_item1 = "<div class='que" + b + "'>" + quest[i][1].split("")[j] + "</div>";
				$(quest_elm_list[i]).find(".line1").append(quest_item1);
				//quest_item2 = "<div class='que" + b + "'>" + quest[i][2].split("")[j] + "</div>";
				//$(quest_elm_list[i]).find(".line2").append(quest_item2);
			}
			for(var k = 0,c = quest[i][3].length - 3;k < c;k++){
				ans_item = "<div class='ans'>" + quest[i][3].split("#")[k] + "</div>";
				$(quest_elm_list[i]).find(".answer_con").append(ans_item);
			}
		}
	}
}
//添加绑定事件
function bindEventListener(){
	//开始游戏
	$(".btn_start_game").bind("click",function(){
		var quest_elm = $(".cross_word_item");
		handlerElm('.start_con');
		$(quest_elm[0]).addClass("cur");
		timer[0] = setInterval(function(){
			ct[0]--;
			if(ct[0] >= 0){
				$(".cur").find(".s_time_num").html(ct[0]+"秒");
			}else{
				clearInterval(timer[0]);
				nextQuestion();
				chTimer();
				return;
			}
		},1000);
	});
}
function nextQuestion(){
	var cur = $(".cur");
	cur.removeClass("cur");
	if(cur.next().length != 0){
		cur.next().addClass("cur");	
	}else{
		countResult('88','最强诗人');
		handlerElm(".evalue_result");
		window.location.href = "answer.html";
	}
}
function chTimer(){
	var items = $(".cross_word_item");
	for(var i = 0,a = items.length;i < a;i++){
		if($(items[i]).hasClass("cur")){
			cur_num = i;
			timer[cur_num] = setInterval(function(){
				ct[cur_num]--;
				if(ct[cur_num] >= 0){
					$(".cur").find(".s_time_num").html(ct[cur_num]+"秒");
				}else{
					clearInterval(timer[cur_num]);
					nextQuestion();
					chTimer();
					return;
				}
			},1000);
		}
	}
}
function answer(question){
	$(".ans").bind("click",function(){
		var c = $(this);
		c.siblings().unbind("click");
		var items = $(".cross_word_item");
		var cur = $(".cur");
		if(cur.hasClass("cross")){
			for(var i = 0,a = items.length;i < a;i++){
				if($(items[i]).hasClass("cur")){
					cur_num1 = i;
					c.addClass("choised_ans");
					c.offset(cur.find(".qu").offset());
					setTimeout(function(){
						user_ans[cur_num1] = c.html();
						clearInterval(timer[cur_num1]);
						nextQuestion();
						chTimer();
						return;
					},500);
				}
			}
		}else if(cur.hasClass("cavil") || cur.hasClass("idiom")){
			for(var i = 0,a = items.length;i < a;i++){
				if($(items[i]).hasClass("cur")){
					cur_num1 = i;
					c.addClass("choised_ans");
					c.offset(cur.find(".qu").offset());
					setTimeout(function(){
						user_ans[cur_num1] = c.html();
						clearInterval(timer[cur_num1]);
						nextQuestion();
						chTimer();
						return;
					},500);
				}
			}
		}
	});
}
function countResult(percent_num,design_name){
	var all_time = 0;
	for(var i = 0;i < ct.length;i++){
		all_time = all_time + 21 - ct[i];
	}
	$(".s_all_time").html(all_time);
	$(".percent_num").html(percent_num);
	$(".design_name").html(design_name);
}
function lookAns(user_ans,right_ans){
	var rights = [],errors = [];
	for(var i = 0,a = right_ans.length;i < a;i++){
		if(user_ans[i] == right_ans[i]){
			var cnt = [];
			cnt[0] = i + 1; //题目序号
			if(question[i][0] == "cross"){
				cnt[1] = "填字题"; //题目类型
			}
			cnt[2] = question[i][1] + "&nbsp;" + question[i][2]; //题目内容
			cnt[2] = cnt[2].replace(/\*/g, "<span style='color:#FF6D63'>" + right_ans[i] + "</span>");
			cnt[3] = right_ans[i]; //正确答案
			rights.push(cnt);
		}else{
			var cnt = [];
			cnt[0] = i + 1; //题目序号
			if(question[i][0] == "cross"){
				cnt[1] = "填字题"; //题目类型
			}
			cnt[2] = question[i][1] + "&nbsp;" + question[i][2]; //题目内容
			cnt[2] = cnt[2].replace(/\*/g, "<span style='color:#FF6D63'>" + right_ans[i] + "</span>");
			cnt[3] = right_ans[i]; //正确答案
			cnt[4] = user_ans[i]; //你的答案
			errors.push(cnt);
		}
	}
	for(var j = 0,b = rights.length;j < b;j++){
		var right_item = "<div class='right_info_item'><div class='quest_info txt_info'>" +
			rights[j][0] + "." + rights[j][1] + "：" + rights[j][2] + "</div><div class='right_ans txt_info'>" +
			"<div class='blue_line'></div>正确答案：" + rights[j][3] + "</div></div>";
		$(".rightans_info_con").append(right_item);
	}
	for(var k = 0,c = errors.length;k < c;k++){
		var error_item = "<div class='error_info_item'>" +
							"<div class='quest_info txt_info'>" + errors[k][0] + "." + errors[k][1] + "：" + errors[k][2] + "</div>" +
							"<div class='your_ans txt_info'>" + "<div class='blue_line'></div>你的答案：" + errors[k][4] + "</div>" +
							"<div class='right_ans txt_info'>" + "<div class='blue_line'></div>正确答案：" + errors[k][3] + "</div>" +
						 "</div>";
		$(".errorans_info_con").append(error_item);
	}				
}
function choiseQuestWord(){
	var line1_child = $(".cavil").find(".line1").children();
	var line2_child = $(".cavil").find(".line2").children();
	var quest_word = [];
	for(var i = 0,a = line1_child.length;i < a;i++){
		quest_word.push($(line1_child[i]));
	}
	for(var k = 0,b = line2_child.length;k < b;k++){
		quest_word.push($(line2_child[k]));
	}
	for(var j = 0,c = quest_word.length;j < c;j++){
		quest_word[j].bind("click",function(){
			var c = $(this);
			var items = $(".cross_word_item");
			var cur = $(".cur");
			if(cur.hasClass("cavil")){
				c.addClass("choised_quest");
				var inner = c.html(),index = 0;
				for(var l = 0,d = items.length;l < d;l++){
					if($(items[l]).hasClass("cur")){
						index = l;
					}
				}
				if(inner == question[index][4]){
					error_num = 0;
					c.siblings().unbind("click");
					c.addClass("qu");
					$(c.parent().siblings().children()).unbind("click");
					cur.find(".answer_tip").removeClass("dis");
					cur.find(".hr_line").removeClass("dis");
					cur.find(".answer_con").removeClass("dis");
					cur.find(".error_tip").hide();
					user_ans[index] = c.html();
				}else{
					error_num++;
					user_ans[index] = c.html();
					cur.find(".error_tip").show();
					if(error_num >= 2){
						error_num = 0;		
						clearInterval(timer[index]);
						nextQuestion();
						chTimer();
						return;
					}
				}
			}
		});
	}
}
