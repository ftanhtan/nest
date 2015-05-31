

(function($){

   var ua = navigator.userAgent;
   var is_IE78 = ua.indexOf("MSIE 6", 0) != -1 || ua.indexOf("MSIE 7", 0) != -1 || ua.indexOf("MSIE 8", 0) != -1;

	$.fn.simpleBtn = function(i_options){

		/*=============================
		* Extend
		=============================*/
		var options = $.extend({

			down:false,
			selected:false,
			fade:false,
			time:250,
			isStartAnimate:true

		}, i_options);

		/*=============================
		* Vars
		=============================*/
		var preloads = ["-over"];

		/*=============================
		* Constructor
		=============================*/
		if(is_IE78) options.time = 0;

		this.mouseenter(onMouseOver);
		this.mouseleave(onMouseOut);
		if(options["down"]){
			this.mousedown(onMouseDown);
			this.mouseup(onMouseUp);
			preloads.push("-down");
		}
		if(options["selected"]){
			preloads = preloads.concat(["-selected","-selected-over","-selected-down"]);
		}


		/*----------------------------
		* init
		----------------------------*/
		function init($i_this){

			var $self = $i_this;
			//プリロード
			var url = $self.children().attr("src");
			for(var i = 0; i<preloads.length; i++){
				new Image().src = url.replace(/(\.gif|\.jpg|\.png)/g,preloads[i] + "$1");
			}


			//ロールオーバーなどに必要な情報格納
			//考え方としては，イベント時にreplaceするのではなく、事前にファイル名と拡張子をプロパティとして持っていて、overやdownの文字列を
			//change関数に渡してurlを作成する。
			var datas = {};
			datas["ex"] = url.match(/\.gif|\.jpg|\.png/); //拡張子取得
			datas["file"] = url.replace(datas["ex"],""); //file名取得
			datas["isSelected"] = false;

			var align = $self.css("text-align");
			datas["isAlignCenter"] = (align == "center" || align == "left" || align == "right") ? true : false;

			$self.data("info",datas);

			if(options["fade"]){
				$self.prepend("<img src='" + ( datas["file"] + "-over" + datas["ex"] )+ "' style='z-index:100; position:absolute; display:none; top:0px;' class='simpleBtnFade' />");
			}

		}

		/*----------------------------
		* マウスオーバー
		----------------------------*/
		function onMouseOver(){
			var $this = $(this);

			if(!options["fade"]){
				change($this,"-over");

			}else{

				var $fadeBtn = $(this).children(".simpleBtnFade");
				var $img = $this.find(".simpleBtnFade").next();

				$fadeBtn.css({top:$img.position().top, left : $img.position().left});

				if(options["isStartAnimate"]){
					$fadeBtn.stop(true, true).fadeIn(options["time"]);
				}else{
					$fadeBtn.stop(true, true).fadeIn(0);
				}
			}

		}


		/*----------------------------
		* マウスアウト
		----------------------------*/
		function onMouseOut(){

			if(!options["fade"]){

				change($(this),"");

			}else{
				$(this).children(".simpleBtnFade").stop(true, true).fadeOut(options["time"]);
			}

		}

		/*----------------------------
		* マウスダウン
		----------------------------*/
		function onMouseDown(){

			var $this = $(this);


			if(!options["fade"]){
				change($this,"-down");
			}else{
				change($(this).children(".simpleBtnFade"),"-down");
			}

			//セレクト状態入れ替え；
			var isSelect = $this.data("info")["selected"];
			if(options["selected"]){
				$this.data("info")["selected"] = (isSelect) ? false : true;
			}

		}


		/*----------------------------
		* マウスアップ
		----------------------------*/
		function onMouseUp(){

			if(!options["fade"]){
				change($(this),"-over");
			}else{
				change($(this).children(".simpleBtnFade"),"-over");
				change($(this).children(".simpleBtnFade").next(),"");
			}

		}


		/*----------------------------------------------------------------------------
		* 画像切り替え
		*simpleBtnクラス自体、または,その子を渡しても関数内で自動的にimg要素が対象となる
		----------------------------------------------------------------------------*/
		function change($i_this,i_type){
			var srcInfo;

			if($i_this.data("info")){

				srcInfo = $i_this.data("info");
				if(srcInfo["selected"]) i_type = "-selected" + i_type;
				$i_this.children()	.attr("src",srcInfo["file"] + i_type + srcInfo["ex"]);

			}else{

				srcInfo = $i_this.parent().data("info");
				if(srcInfo["selected"]) i_type = "-selected" + i_type;
				$i_this.attr("src",srcInfo["file"] + i_type + srcInfo["ex"]);

			}
		}


		//メソッドチェーン用
		return this.each(function(){ init( $(this) ); });

	}


})(jQuery);
