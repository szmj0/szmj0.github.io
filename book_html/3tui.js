var g_nTuiStyle = 1;	// 0: ��ѡ�� 1: ��ѡ��(7��ѡ����) 2: ��ѡ��(3��ѡ����)
var g_nTuiInit = 0;		// ��ѡ�ͣ������˶Ի���ʱ�ĳ�ʼֵ��0 ��ѡ��4 �˶ӣ�6 ���Ŷӣ�7 �˵��Ŷ�
var g_sTuiNote = "<font style='font-size:11pt' color=brown>ע�����ʲô��ʲô���������ѡ�˵����������ѡ���ţ�����ӻ�Сʱ������������ѡ�˶ӡ�</font>";
var g_nAliasNum = 0;// �Զ��廯���������� 0-9����Ϊ 0 ʱ��ÿ�δ� g_sAlias ���ѡ���Զ�������������
// �Զ��廯�����������ʽ�ڷ����������
var g_sAlias = ["ƽ��","�Ҹ�","����","����"];

var g_nTui, g_nTuiNum, g_sTuiData;

function goTui()
{
	var n = 0;
	if (chk0.checked) n = 1;
	if (chk1.checked) n += 2;
	if (chk2.checked) n += 4;
	if (n == 0) {alert("�������ѡ�˵�\n�������ѡ����\n����ӻ�Сʱ������������ѡ�˶�");return false;} else g_nTui = n;
	setTimeout("selAlias();", 1);
}

function goTui2(n)
{
	g_nTui = [7,6,4,3,5,1,2][n];
	setTimeout("selAlias();", 1);
}

function chkAlias(s)
{
	var n = s.length;
	if (n<2) {alert("�������� 2 ���֣�");return false;}
	for (var i=n-1; i>=0; --i)
	{
		var c=s.charCodeAt(i);
		if (c < 19968 || c > 40869) {alert("�������붼�Ǻ��֣�");return false;}
	}
	if (g_nTuiNum > 0 && g_sTuiData.indexOf(s) >= 0) {alert("�����ظ���");return false;}
	return true;
}

function getTuiType()
{
	var s = '��';
	if (g_nTui & 1) s += '��';
	if (g_nTui & 2) s += '��';
	if (g_nTui & 4) s += '��';	
	return s;
}

function submitTui(s)
{
	if (s == '��������') s = prompt("�����뻯�������������� 2 ���֣�", "");
	if (s == null) return; else s = s.replace(/\s/g,"");
	if (!chkAlias(s)) return;
	if (g_nTuiNum > 0)
	{
		if (g_sTuiData != "") g_sTuiData += ";";
		g_sTuiData += s+","+getTuiType();
		var t = "<font color=green><b>" + g_sTuiData.replace(/;/g,"<br>") + "</b></font>"
		easyDialog.open({container:{header:"����� "+g_nTuiNum+" ��", content:t, yesText:"�ύ����", noText:"�������", yesFn:submitTui2, noFn:doTui2}});
		g_nTuiNum++;
		return;
	}
	easyDialog.close();
	sendTui(s+','+getTuiType());
}

function submitTui2()
{
	easyDialog.close();
	sendTui(g_sTuiData);
}

function sendTui(s)
{
	var t = encodeURIComponent(s);
	var f = "3tuiok.html?data="+t+"&v="+djb(t);
	if (!window.XMLHttpRequest) {window.location.href = f;return;}
	var xhr = new XMLHttpRequest();
    xhr.open("GET", f, true);
    xhr.setRequestHeader('If-Modified-Since', '0');
	xhr.setRequestHeader("Cache-Control","no-cache");
    xhr.timeout = 3500;
	var bFail = false;
	xhr.onerror = function () {if (!bFail) {bFail = true;alert("�ύ����");}}
    xhr.onreadystatechange=function ()
    {
    	if (xhr.readyState != 4) return;
    	if (xhr.status == 200)
    	{
			s = "<b><font color=blue>лл�����ǽ��������ύ���������ݣ��������ں�����Ԫ��վ�Ǽ���Ч�����ˣ�������ס��������ڡ�</font><br><br><font color=green>" + s.replace(/;/g, '<br>') + "</font><br><br>";
			if (typeof(g_sFile) != "undefined" && g_sFile != "")
			{
				s += "�������������ļ����˽�������ࣺ<br><a href='media/"+g_sFile+"' onclick='easyDialog.close();' "+getDL(g_sFile)+">"+g_sFile+"</a>";
			} else
				s += "����������վ���ݡ�";
			s += "</b><br><br><img src='images/tuidang.png'>";
			easyDialog.open({container:{header:"���˳ɹ���", content:s, noText:"�ر�", noFn:true}});
        } else
        	if (!bFail) {bFail = true;alert("�ύʧ�ܣ�");}
    }
    xhr.send();
}

function sendMsg(s)
{
	s = s.replace(/\r/g, "").replace(/\n/g, " ");
	var t = encodeURIComponent(s);
	var f = "msgok.html?data="+t+"&v="+djb(t);
	if (!window.XMLHttpRequest) {window.location.href = f;return;}
	var xhr = new XMLHttpRequest();
    xhr.open("GET", f, true);
    xhr.timeout = 3500;
	var bFail = false;
	xhr.onerror = function () {if (!bFail) {bFail = true;alert("�ύ����");}}
    xhr.onreadystatechange=function ()
    {
    	if (xhr.readyState != 4) return;
    	if (xhr.status == 200)
    	{
			s = "<b><font color=blue>лл���ķ�����</font><br><br><font color=green>" + s + "</font><br><br>����������վ���ݡ�</b><br><br>";
			easyDialog.open({container:{header:"��ʾ", content:s, noText:"�ر�", noFn:true}});
        } else
        	if (!bFail) {bFail = true;alert("�ύʧ�ܣ�");}
    }
    xhr.send();
}

function stopPropagation(e)
{
	e = window.event || e;
	if (document.all) e.cancelBubble=true; else e.stopPropagation();
}

function initTui(nTuiNum)
{
	g_nTuiNum = nTuiNum;
	g_sTuiData = "";	
}

function doTui(n) {initTui(0);doTui0(n);}
function doTui1() {initTui(1);doTui0();}
function doTui2() {setTimeout("doTui0();", 1);}
function popTui() {setTimeout("doTui();", 1);}

function doTui0(n)
{
	var t = "��ѡ���˳�����"+(g_nTuiNum>1 ? " (��"+g_nTuiNum+"��)" : "");
	if (g_nTuiStyle == 0)
	{
		if (n === undefined || n < 0 || n > 7) n = g_nTuiInit;
		var s = "", arr = ["�˵�","����","�˶�"];
		for (var i=0; i<3; ++i) s += '<div class=menuitem onclick="chk'+i+'.checked=!chk'+i+'.checked;"><input class=chk id=chk'+i+' type=checkbox '+(n & (1<<i) ? 'checked' : '')+' onclick="stopPropagation(event);"> '+arr[i]+'</div>';
		s += g_sTuiNote;
		easyDialog.open({container:{header:t, content:s, yesFn:goTui, noFn:true}});
		return;
	}
	var s = "", arr = g_nTuiStyle==1 ? ["�˵��Ŷ�","���Ŷ�","�˶�","�˵���","�˵���","�˵�","����"] : ["�˵��Ŷ�","���Ŷ�","�˶�"];
	n = arr.length;
	for (var i=0; i<n; ++i) s += '<div class=menuitem onclick="goTui2('+i+');" onmouseover="style.background=\'#d6ddf2\';" onmouseout="style.background=\'white\';">'+arr[i]+'</div>';
	if (g_nTuiStyle < 2) s += g_sTuiNote;
	easyDialog.open({container:{header:t, content:s}});
}

function shuffle(m)
{
	var n = g_sAlias.length;
	var a = new Array(n);
	var r = new Array(m);
	for (var i=0; i<m; ++i)
	{
		var k = n-i;
		var j = Math.floor(Math.random() * k);
		r[i] = a[j]?a[j]:j;
		a[j] = a[--k]?a[k]:k;
	}
	return r;
}

function selAlias()
{
	var s = "";
	var k = Math.min(g_nAliasNum, g_sAlias.length);
	var r = k > 0 ? shuffle(k) : [];
	for (var i=0; i<10; ++i)
	{
		var t = i < k ? g_sAlias[r[i]] : i < 9 ? getAlias() : "��������";
		s += '<div class=menuitem onclick="submitTui(\''+t+'\');" onmouseover="style.background=\'#d6ddf2\';" onmouseout="style.background=\'white\';">'+t+'</div>';
	}
	easyDialog.open({container:{header:"��ѡ����"+getTuiType(), content:s}});
}

function djb(s)
{
	var n = 5381;
	for (var i=s.length-1; i>=0; --i) {n += (n << 5) + s.charCodeAt(i);if (n > 0xffffff) n &= 0xffffff;}
	return n;
}

var NAME1 = "������ǰ���������Ա�ΰ���˹��������г���Դ��Ӣï������׿�����岨����Խ��Ԫ�ܺ�ȫ����������ɽ���±�˳���ӽ��ο���ѧ�鰲���Ǳ����кͲ����Ⱦ�����Ⱥ�ĵ���������ԣ�������������֮��ά�賿�����������ʵ���޴�������ͨ�������ٴ����¼���������ʱ̩ʢ����ǧ��ͬʯɭ����ƽ������ʿԭ�������Կ�Ʒ��ͤͥ͢��������Ե��������Ѹ������Ȫ֪�ٺϳ�������������Ծ���������˽���Ч�ݴ��Ҹ߷�������ǫ��λ�Ÿ��̺���";
var NAME2 = "����ɻ����Ž������ѩ÷�ٻ����¼Ѽ��ڹ�Ҷ���������ӱ�Ǻɵ����ܰ����԰��ӽ���������������������ܿ�������Ͽ�ʫ����ͮ����������Բ�����˵���ѱ��ʲɶ��ϲ��˫�����������";
var LEN_NAME31 = 201;
var LEN_NAME32 = 86;
var LEN_NAME3 = LEN_NAME31 + LEN_NAME32;

var m_sBlock, m_chBlock, m_nBlock = [];

function loadBlock()
{
var BLOCK = [
"��׿",
"����",
"������",
"�����ٱ����úϽ�������",
"��������",
"��������",
"��������",
"���ɲ�������ʿ",
"����",
"�ɵ�������",
"����������",
"������",
"��������",
"����",
"��ƽɭ������",
"������",
"��������",
"������",
"������",
"������",
"�����ʫ��",
"����",
"��Ѹ������",
"����",
"��",
"������",
"��",
"��",
"��������",
"����ͤͥ͢",
"�õ���",
"�¹���",
"�ϵѾ�",
"�ѵϾ�",
"���",
"������",
"����ɭ",
"��",
"�˵���",
"�������ѩ����",
"���˶�",
"������",
"������",
"��",
"��",
"�Შ��",
"��",
"��������ѧԭ",
"��������",
"�ߵµ�",
"��",
"�󰲹�",
"�𰲹�԰Բ֮",
"����������",
"��",
"��Ч����",
"��Ч����",
"������",
"��",
"��",
"�ø߿�����",
"��",
"����",
"����",
"�ӱ��������ö���������",
"����",
"����",
"��������",
"��",
"�Ե�",
"������",
"������",
"������",
"��",
"��ƽ",
"��ƽ",
"�Ҵ�ƽ",
"��ƽ",
"����",
"��ʯ",
"��",
"��������������",
"������",
"������",
"������",
"��������������",
"��������",
"��Ѹ",
"����ͤͥ͢",
"��",
"������",
"��������",
"������",
"��",
"��",
"���������",
"�����",
"������",
"������",
"��",
"��",
"����",
"��",
"��",
"����",
"����",
"���Ӽ���",
"��",
"��������",
"��������",
"����",
"ï����",
"����",
"����",
"��",
"��",
"��",
"��",
"��",
"����ͬ",
"��",
"����",
"Ʒ",
"ƽ����������",
"��",
"��",
"��",
"��",
"ǧ������",
"ǫ������",
"ǰ��ǧǫ",
"�ű���",
"�ɺ�",
"�ڵϷ�ʢ����ԣ",
"��߼ҽ��ͤͥ͢",
"����",
"�ﱣ����ǧѩӱ֮",
"ȫ����",
"Ȫ��",
"Ⱥ",
"����",
"��",
"��",
"��",
"��",
"����",
"��",
"��֮",
"������",
"ɽ��",
"������",
"��",
"����ɭ��",
"��ɭ��ѧ",
"ʢ��",
"ʯ������",
"ʱǧ",
"ʵ",
"ʿ����",
"������",
"��",
"��",
"˫��ʫ����",
"˳��",
"�ɾ�����Ҷ����",
"����������",
"̩����������������",
"��",
"�������ͥ����",
"�����",
"����",
"����",
"͢������ܰ��",
"ͤ������ܰ��",
"ͥ������ܰ��",
"ͨ��������֪",
"ͬͨ��ѧ",
"ͮͨ��ѧ",
"��",
"ά",
"ΰ������������",
"����",
"λ��",
"��",
"ϲ������ԣ",
"��������ʫ֪",
"�ͷ�����ʫ��",
"�԰�",
"��",
"��",
"����",
"����",
"����ƽ��",
"Ч������",
"�Ķෲ�Ậ",
"����",
"�·�",
"ܰ��",
"�ŷậ",
"�˷�",
"�Ƿ�",
"�޵�����",
"���",
"��",
"��",
"��",
"ѧ",
"ѩ��",
"Ѹ����",
"��",
"��",
"�԰�������",
"�Ұ�",
"�а�",
"����",
"����",
"����������",
"Ҷƽ��Ӣ����ԣ",
"��",
"������",
"�Ǵ�����������Ѹ��",
"�˴�����������Ѹ��",
"��������������Ѹ��",
"��",
"�����",
"�����",
"�ն�������",
"�����",
"�����",
"�����",
"Ӣ����ɭ��������",
"ӱ����",
"���Կ�",
"ӽ��",
"�Ź���",
"����",
"�ѱ��ϲ",
"�б��ϲ",
"��",
"��",
"��",
"��ѩ��",
"���",
"��",
"ԣ��",
"Ԫ������",
"԰��Բ",
"ԭ",
"Բ",
"Ե",
"Դ",
"����",
"������",
"����",
"Ծ��",
"Խ��",
"��ɽ��",
"ܿ��",
"��",
"�˵�����",
"�ϻ�",
"��",
"����",
"��",
"���",
"����",
"֪��",
"������",
"�вɲʶ���ѧԪԽ��",
"��",
"��",
"��",
"����Ҷ",
"׿",
"�Ӷ�",
"��",
"�Ը���������λ"
];
	var n = BLOCK.length, sb = '', ch = [];
	for (var i=0; i<n; ++i)
	{
		var s = BLOCK[i];
		ch[i] = s.charAt(0);
		if (s.length > 1) sb += s.substring(1);
		m_nBlock[i+1] = sb.length;
	}
	m_sBlock = ch.join('');
	m_chBlock = sb.split('');
}
loadBlock();

function getAlias()
{
  	var i, j, c, c1=0, c2=0;
	while (c1 == 0)
	{
		j = nextInt(LEN_NAME3);
		c = getChar2(j);
		if (c2 == 0)
		{
			if ("��������ƷЧ��ʿ����ǰ��λ���Ժ���ӳ�����".indexOf(c) < 0) c2 = c;
			continue;
		} else
			if (c != c2 && "��ʫ��֮���÷ɭ��".indexOf(c) < 0) c1 = c; else continue;
		i = m_sBlock.indexOf(c1);
		if (i < 0) break;
		j = m_nBlock[i+1];
		for (i=m_nBlock[i]; i<j; ++i) if (m_chBlock[i] == c2) {c1 = 0;break;}
	}
	return c1 + c2;
}

function getChar2(j) {return j < LEN_NAME31 ? NAME1.charAt(j) : NAME2.charAt(j - LEN_NAME31);}
function nextInt(n) {return Math.floor(Math.random()*n);}

function toast(s, t)
{
	if (typeof s == "undefined" || getCookie("toast")) return;
	Toastify({text:s,duration:t,newWindow:true,stopOnFocus:true,close:true}).showToast();
	setCookie("toast");
}

// easyDialog
(function(o,v){var g=o.document,q=g.documentElement,J=function(){var p=g.body,w=!-[1,],r=w&&/msie 6/.test(navigator.userAgent.toLowerCase()),I=1,y="cache"+(+new Date+"").slice(-8),u={},d=function(){};d.prototype={getOptions:function(a){var b,c={},e={container:null,overlay:true,drag:false,fixed:true,follow:null,followX:0,followY:0,autoClose:0,lock:false,callback:null};for(b in e)c[b]=a[b]!==v?a[b]:e[b];d.data("options",c);return c},setBodyBg:function(){if(p.currentStyle.backgroundAttachment!=="fixed"){p.style.backgroundImage=
"url(about:blank)";p.style.backgroundAttachment="fixed"}},appendIframe:function(a){a.innerHTML='<iframe style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;border:0 none;filter:alpha(opacity=0)"></iframe>'},setFollow:function(a,b,c,e){b=typeof b==="string"?g.getElementById(b):b;a=a.style;a.position="absolute";a.left=d.getOffset(b,"left")+c+"px";a.top=d.getOffset(b,"top")+e+"px"},setPosition:function(a,b){var c=a.style;c.position=r?"absolute":b?"fixed":"absolute";if(b){if(r)c.setExpression("top",
'IE6=document.documentElement.scrollTop+document.documentElement.clientHeight/2+"px"');else c.top="50%";c.left="50%"}else{r&&c.removeExpression("top");c.top=q.clientHeight/2+d.getScroll("top")+"px";c.left=q.clientWidth/2+d.getScroll("left")+"px"}},createOverlay:function(){var a=g.createElement("div"),b=a.style;b.cssText="margin:0;padding:0;border:none;width:100%;height:100%;background:#333;opacity:0.6;filter:alpha(opacity=60);z-index:9999;position:fixed;top:0;left:0;";if(r){p.style.height="100%";
b.position="absolute";b.setExpression("top",'IE6=document.documentElement.scrollTop+"px"')}a.id="overlay";return a},createDialogBox:function(){var a=g.createElement("div");a.style.cssText="margin:0;padding:0;border:none;z-index:10000;";a.id="easyDialogBox";return a},createDialogWrap:function(a){var b=typeof a.yesFn==="function"?'<button class="btn_highlight" id="easyDialogYesBtn">'+(typeof a.yesText==="string"?a.yesText:"\u786e\u5b9a")+"</button>":"",c=typeof a.noFn==="function"||a.noFn===true?
'<button class="btn_normal" id="easyDialogNoBtn">'+(typeof a.noText==="string"?a.noText:"\u53d6\u6d88")+"</button>":"";a=['<div class="easyDialog_content">',a.header?'<div class="easyDialog_title" id="easyDialogTitle"><span title="\u5173\u95ed" class="close_btn" id="closeBtn">&times;</span>'+a.header+"</div>":"",'<div class="easyDialog_text">'+a.content+"</div>",b===""&&c===""?"":'<div class="easyDialog_footer">'+c+b+"</div>","</div>"].join("");b=g.getElementById("easyDialogWrapper");
if(!b){b=g.createElement("div");b.id="easyDialogWrapper";b.className="edw"}b.innerHTML=a.replace(/<[\/]*script[\s\S]*?>/ig,"");return b}};d.data=function(a,b,c){if(typeof a==="string"){if(b!==v)u[a]=b;return u[a]}else if(typeof a==="object"){a=a===o?0:a.nodeType===9?1:a[y]?a[y]:a[y]=++I;a=u[a]?u[a]:u[a]={};if(c!==v)a[b]=c;return a[b]}};d.removeData=function(a,b){if(typeof a==="string")delete u[a];else if(typeof a==="object"){var c=a===o?0:a.nodeType===9?1:a[y];if(c!==v){var e=function(m){for(var n in m)return false;
return true},f=function(){delete u[c];if(!(c<=1))try{delete a[y]}catch(m){a.removeAttribute(y)}};if(b){delete u[c][b];e(u[c])&&f()}else f()}}};d.event={bind:function(a,b,c){var e=d.data(a,"e"+b)||d.data(a,"e"+b,[]);e.push(c);if(e.length===1){c=this.eventHandler(a);d.data(a,b+"Handler",c);if(a.addEventListener)a.addEventListener(b,c,false);else a.attachEvent&&a.attachEvent("on"+b,c)}},unbind:function(a,b,c){var e=d.data(a,"e"+b);if(e){if(c)for(var f=e.length-1,m=e[f];f>=0;f--)m===c&&e.splice(f,1);
else e=v;if(!e||!e.length){c=d.data(a,b+"Handler");if(a.addEventListener)a.removeEventListener(b,c,false);else a.attachEvent&&a.detachEvent("on"+b,c);d.removeData(a,b+"Handler");d.removeData(a,"e"+b)}}},eventHandler:function(a){return function(b){b=d.event.fixEvent(b||o.event);for(var c=d.data(a,"e"+b.type),e=0,f;f=c[e++];)if(f.call(a,b)===false){b.preventDefault();b.stopPropagation()}}},fixEvent:function(a){if(a.target)return a;var b={},c;b.target=a.srcElement||document;b.preventDefault=function(){a.returnValue=
false};b.stopPropagation=function(){a.cancelBubble=true};for(c in a)b[c]=a[c];return b}};d.capitalize=function(a){var b=a.charAt(0);return b.toUpperCase()+a.replace(b,"")};d.getScroll=function(a){a=this.capitalize(a);return q["scroll"+a]||p["scroll"+a]};d.getOffset=function(a,b){var c=this.capitalize(b);c=q["client"+c]||p["client"+c]||0;var e=this.getScroll(b),f=a.getBoundingClientRect();return Math.round(f[b])+e-c};var x,G=function(a){a.keyCode===27&&D.close()},D={open:function(a){var b=new d,c=b.getOptions(a||{});a=d.event;var e=q.clientWidth,f=q.clientHeight,m=this,n,h,j,l;if(x){clearTimeout(x);x=v}if(c.overlay){n=g.getElementById("overlay");if(!n){n=b.createOverlay();p.appendChild(n);r&&b.appendIframe(n)}n.style.display="block"}r&&b.setBodyBg();h=g.getElementById("easyDialogBox");
if(!h){h=b.createDialogBox();p.appendChild(h)}if(c.follow){l=function(){b.setFollow(h,c.follow,c.followX,c.followY)};l();a.bind(o,"resize",l);d.data("follow",l);if(n)n.style.display="none";c.fixed=false}else b.setPosition(h,c.fixed);h.style.display="block";j=typeof c.container==="string"?g.getElementById(c.container):b.createDialogWrap(c.container);if(l=h.getElementsByTagName("*")[0]){if(l&&j!==l){l.style.display="none";p.appendChild(l);h.appendChild(j)}}else h.appendChild(j);j.style.display="block";
var t=j.offsetWidth,i=j.offsetHeight;l=t>e;var k=i>f;j.style.marginTop=j.style.marginRight=j.style.marginBottom=j.style.marginLeft="0px";if(c.follow)h.style.marginLeft=h.style.marginTop="0px";else{h.style.marginLeft="-"+(l?e/2:t/2)+"px";h.style.marginTop="-"+(k?f/2:i/2)+"px"}if(r&&!c.overlay){h.style.width=t+"px";h.style.height=i+"px"}e=g.getElementById("closeBtn");f=g.getElementById("easyDialogTitle");j=g.getElementById("easyDialogYesBtn");t=g.getElementById("easyDialogNoBtn");j&&a.bind(j,"click",
function(s){c.container.yesFn.call(m,s)!==false&&m.close()});if(t){i=function(s){if(c.container.noFn===true||c.container.noFn.call(m,s)!==false)m.close()};a.bind(t,"click",i);e&&a.bind(e,"click",m.close)}else e&&a.bind(e,"click",m.close);c.lock||a.bind(g,"keyup",G);if(c.autoClose&&typeof c.autoClose==="number")x=setTimeout(m.close,c.autoClose);if(c.drag&&f&&!l&&!k){f.style.cursor="move";d.drag(f,h)}if(!c.follow&&!c.fixed){i=function(){b.setPosition(h,false)};!l&&!k&&a.bind(o,"resize",i);d.data("resize",
i)}d.data("dialogElements",{overlay:n,dialogBox:h,closeBtn:e,dialogTitle:f,dialogYesBtn:j,dialogNoBtn:t})},close:function(){var a=d.data("options"),b=d.data("dialogElements"),c=d.event;if(x){clearTimeout(x);x=v}if(a.overlay&&b.overlay)b.overlay.style.display="none";b.dialogBox.style.display="none";r&&b.dialogBox.style.removeExpression("top");b.closeBtn&&c.unbind(b.closeBtn,"click");b.dialogTitle&&c.unbind(b.dialogTitle,"mousedown");b.dialogYesBtn&&c.unbind(b.dialogYesBtn,"click");b.dialogNoBtn&&c.unbind(b.dialogNoBtn,
"click");if(!a.follow&&!a.fixed){c.unbind(o,"resize",d.data("resize"));d.removeData("resize")}if(a.follow){c.unbind(o,"resize",d.data("follow"));d.removeData("follow")}a.lock||c.unbind(g,"keyup",G);typeof a.callback==="function"&&a.callback.call(D);d.removeData("options");d.removeData("dialogElements")}};return D},A=function(){o.easyDialog=J()},H=function(){if(!g.body){try{q.doScroll("left")}catch(p){setTimeout(H,1);return}A()}};(function(){if(g.body)A();else if(g.addEventListener){g.addEventListener("DOMContentLoaded",
function(){g.removeEventListener("DOMContentLoaded",arguments.callee,false);A()},false);o.addEventListener("load",A,false)}else if(g.attachEvent){g.attachEvent("onreadystatechange",function(){if(g.readyState==="complete"){g.detachEvent("onreadystatechange",arguments.callee);A()}});o.attachEvent("onload",A);var p=false;try{p=o.frameElement==null}catch(w){}q.doScroll&&p&&H()}})()})(window,undefined);
// toast
(function(n,t){typeof module=="object"&&module.exports?module.exports=t():n.Toastify=t()})(this,function(){var n=function(t){return new n.lib.init(t)};return n.lib=n.prototype={toastify:"1.7.0",constructor:n,init:function(n){return n||(n={}),this.options={},this.toastElement=null,this.options.text=n.text,this.options.duration=n.duration===0?0:n.duration||3e3,this.options.selector=n.selector,this.options.callback=n.callback||function(){},this.options.newWindow=n.newWindow||!1,this.options.close=n.close||!1,this.options.backgroundColor=n.backgroundColor,this.options.className=n.className||"",this.options.stopOnFocus=n.stopOnFocus===undefined?!0:n.stopOnFocus,this},buildToast:function(){var n,t,i;if(!this.options)throw"";if(n=document.createElement("div"),n.className="toastify on toastify-center "+this.options.className,this.options.backgroundColor&&(n.style.background=this.options.backgroundColor),n.innerHTML=this.options.text,this.options.close===!0&&(t=document.createElement("div"),t.innerHTML="&#10006;",t.className="toast-close",t.addEventListener("click",function(n){n.stopPropagation();this.removeElement(this.toastElement);window.clearTimeout(this.toastElement.timeOutValue)}.bind(this)),i=window.innerWidth>0?window.innerWidth:screen.width,n.insertAdjacentElement("afterbegin",t)),this.options.stopOnFocus&&this.options.duration>0){const t=this;n.addEventListener("mouseover",function(){window.clearTimeout(n.timeOutValue)});n.addEventListener("mouseleave",function(){n.timeOutValue=window.setTimeout(function(){t.removeElement(n)},t.options.duration)})}return n},showToast:function(){this.toastElement=this.buildToast();var n;if(n=typeof this.options.selector=="undefined"?document.body:document.getElementById(this.options.selector),!n)throw"Root element is not defined";return n.insertBefore(this.toastElement,n.firstChild),this.options.duration>0&&(this.toastElement.timeOutValue=window.setTimeout(function(){this.removeElement(this.toastElement)}.bind(this),this.options.duration)),this},removeElement:function(n){n.className=n.className.replace(" on","");window.setTimeout(function(){n.parentNode&&n.parentNode.removeChild(n);this.options.callback.call(n)}.bind(this),400)}},n.lib.init.prototype=n.lib,n})
