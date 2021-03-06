puzzleController = undefined

function itsIE() {
    return window.navigator.userAgent.indexOf("MSIE ") > 0;
}

if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}

function createMatrix(m, n){
	return _.flatten(
				_.map(_.range(m), function(i){
					return _.map(_.range(n), function(j){
						return _.object(['i','j'],[i,j]);
					});
				}));
}

function PuzzleController(puzzleView, puzzleModel){
	var warnings = new WarningMatrix(puzzleModel.size.i, puzzleModel.size.j);

	var matrix = createMatrix(puzzleModel.size.i, puzzleModel.size.j);
	var tellSpotsContainsNumberVsBlankSpots = function(){
		return _.partition(matrix, function(p){return puzzleModel.get(p.i,p.j) != '/';});
	};	

	var spotsSubsets = tellSpotsContainsNumberVsBlankSpots();
	var numberedPos = spotsSubsets[0];
	var blankPos = spotsSubsets[1];

	this.loadPuzzleNew = function(){
		_.each(numberedPos, function(p){
			puzzleView.put(puzzleModel.get(p.i, p.j), p.i, p.j);
		});
	};

	this.lockPuzzle = function(){
		_.each(numberedPos, function(p){
			puzzleView.lock(p.i, p.j);
		});
	};

	this.unlockPuzzle = function(){
		_.each(numberedPos, function(p){
			puzzleView.unlock(p.i, p.j);
		});	
	};

	this.clearPuzzle = function(){
		_.each(numberedPos, function(p){
			puzzleView.clear(p.i, p.j);
		});
		warnings = warnings.clearAll();
	};

	this.clearSolution = function(){
		_.each(blankPos, function(p){
			puzzleView.clear(p.i, p.j);
			puzzleModel.clear(p.i, p.j);
		});
		puzzleView.seekAttentionToTimer();
		warnings = warnings.clearAll();
	};

	this.numberInput = function(value, i, j){

		if(value == '') {
			value = '/';
			puzzleModel.change(value, i, j)
		}else{
			puzzleModel.change(parseInt(value), i, j);
		}

		if(displayedHint != undefined){
			if (i == displayedHint.i && j == displayedHint.j){
				puzzleView.clearHint(i, j);
			}
		}
		errors = puzzleModel.validate();
		warnings = warnings.update(errors);
		if(puzzleModel.finished()) {
			puzzleFinished()
		};
	};

	function MoveAroundCtroller(){
		function dec(x){
			x = x - 1;
			if(x == -1) x = 8;
			return x;
		}
		this.stepLeft = function(i, j){
			j = dec(j);
			while(_.findWhere(numberedPos, {i:i, j:j})){
				j = dec(j);
			}
			puzzleView.focus(i, j);
		}

		this.stepUp = function(i, j){
			i = dec(i);
			while(_.findWhere(numberedPos, {i:i, j:j})){
				i = dec(i);
			}
			puzzleView.focus(i, j);
		}

		this.stepRight = function(i, j){
			j = (j + 1)%9;
			while(_.findWhere(numberedPos, {i:i, j:j})){
				j = (j + 1)%9;
			}
			puzzleView.focus(i, j);
		}

		this.stepDown = function(i, j){
			i = (i + 1)%9;
			while(_.findWhere(numberedPos, {i:i, j:j})){
				i = (i + 1)%9;
			}
			puzzleView.focus(i, j);			
		}
	}

	this.moveAroundCtrl = new MoveAroundCtroller();

	var displayedHint = undefined

	this.help = function(){
		$.ajax(AjaxHelpMsg());
	}

	function AjaxHelpMsg(){
		return {
			type : "POST",
			url : "sudoku/help",
			data : puzzleModel.toString(),
			contentType: 'application/json',
			success: responseHandling
		}

		function responseHandling(response){
			var hints = JSON.parse(response)
			displayDeterminedHelp(hints)
			for(var i = 0; i < hints.length; i++){
				hint = createHint(hints[i])
				hint.display()
			}
		}

		function displayDeterminedHelp(hints){
			var single = hints[hints.length - 1]
			var p = single.updator.finding.poses[0]
			var v = single.updator.finding.possibilities[0]
			puzzleView.putHint(p[0], p[1], v);
			displayedHint = {'i':p[0], 'j':p[1], 'v': v}
		}

		function createHint(hint){
			var hintName = hint.finder

			if (hintName == "XWing"){
				return createComposedHint(hint)
			} else {
				return createHint(hint)
			}

			function createComposedHint(hint){
				var possibilities = hint.updator[0].finding.possibilities
				var poses = []
				for (i in hint.updator){
					poses = poses.concat(hint.updator[i].finding.poses)
				}
				return new Hint(hintName, possibilities, poses)
			}

			function createHint(hint){
				var poses = hint.updator.finding.poses
				var possibilities = hint.updator.finding.possibilities
				return new Hint(hintName, possibilities, poses)
			}
			
		}

		function Hint(hintName, possibilities, poses){
			this.display = function(){
				puzzleView.putHintName(hintName, 
					                   hintMouseIn(poses, possibilities), 
					                   hintMouseOut(poses))
			}
		}

		function hintMouseIn(poses, possibilities){
			return function(){
				puzzleView.highLightHintsAtCell(poses, possibilities)
				puzzleView.hightLightHintName(this)
			}
		}

		function hintMouseOut(poses){
			return function(){
				puzzleView.removeHighLightHintsAtCell(poses)
				puzzleView.removeHighLightHintName(this)
			}	
		}
	}

	this.clearHint = function(){
		if(displayedHint != undefined){
			puzzleView.clearHint(displayedHint.i, displayedHint.j)
		}
	}

}

function puzzleFinished(){
	var time = timer.stop();
	var isNewBest = bestTimeController.saveWhenTimeIsNewBest(time, levelCtrl.currentLevel());
	bouceOutFinishedTime(isNewBest, time.toString());
}

// function formatedTime(timePassed){
// 	if (timePassed == 0) return '--:--:--'
// 	function addLeading0(num){
// 		if (num < 10) return '0' + num;
// 		return '' + num;
// 	}

// 	var c = Math.floor(timePassed/1000);
// 	return _.map([3600, 60, 1], function(unit){
// 				var result = addLeading0(Math.floor(c/unit))
// 				c = c%unit;
// 				return result;
// 				}).join(':');
// }

function Duration(durationInMs){
	this.toString = function(){
		return formatedTime(durationInMs)
	}

	this.compare = function(otherDuration){
		return durationInMs - otherDuration.getDurationInMs()
	}

	this.getDurationInMs = function(){
		return durationInMs
	}

	function formatedTime(timePassed){
		if (timePassed == 0) return '--:--:--'
		function addLeading0(num){
			if (num < 10) return '0' + num;
			return '' + num;
		}

		var c = Math.floor(timePassed/1000);
		return _.map([3600, 60, 1], function(unit){
					var result = addLeading0(Math.floor(c/unit))
					c = c%unit;
					return result;
					}).join(':');
	}
}

function StopWatch(){
	var showInView = function(){}
	this.setShowInView = function(show){
		showInView = show;
	}
	var interval = 500;
	var startTime = 0;
	var timePassed = new Duration(0)

	function update(){
		timePassed = new Duration(Date.now() - startTime);
		showInView(timePassed.toString())
	}

	var tic;

	this.start = function(){
		if(tic !== "undefined"){
			clearInterval(tic);
		}

		timePassed = new Duration(0)
		startTime = Date.now();
		tic = setInterval(update, interval);
	};

	this.stop = function(){
		clearInterval(tic);
		return timePassed
	}
}


function getNewPuzzle(){

	if(puzzleController != undefined){puzzleController.clearHint();}

	var clevel = levelCtrl.currentLevel();
	$.ajax({
		type : "POST",
		url : "sudoku/new",
		data : JSON.stringify({level:levelCtrl.currentLevel(), type: puzzleType}),
		contentType: 'application/json',
		success : function(response){
			if(typeof puzzleController != 'undefined'){
				puzzleController.unlockPuzzle();
				puzzleController.clearPuzzle();
				puzzleController.clearSolution();
			}
			puzzle = JSON.parse(response);
			if (puzzleType == '9'){
				puzzleModel = new PuzzleModel(puzzle, 3);
			}
			else{
				puzzleModel = new PuzzleModel(puzzle, 1);
			}
			puzzleController = new PuzzleController(puzzleView, puzzleModel);
			puzzleController.loadPuzzleNew();
			puzzleController.lockPuzzle();
			puzzleView.setResetbuttonDelegation(puzzleController.clearSolution);
			puzzleView.setKeyUpDelegation(puzzleController.numberInput);
			puzzleView.setMoveAroundCtrl(puzzleController.moveAroundCtrl);
			puzzle = undefined;
			timer.start();
			$('#button-help').unbind('click')
			$('#button-help').click(puzzleController.help);

		}
	});
}

function BestTimeController(){
	this.saveWhenTimeIsNewBest = function(duration, sudokulevel){
		var bestTime = userInfo.getBestTimeInLevel(sudokulevel);
		if(duration.compare(bestTime) < 0 || bestTime.getDurationInMs() == 0){
			userInfo.setBestTimeInLevel(sudokulevel, duration);
			bestTimeView.renderBestTimeForLevel(duration.toString());
			return true;
		}
		return false;
	}
	this.loadBestTime = function(sudokulevel){
		var bestTime = userInfo.getBestTimeInLevel(sudokulevel);
		bestTimeView.renderBestTimeForLevel(bestTime.toString());
	}
}

function LevelSelectionController(){
	var sudokulevel = 'normal';

	this.levelChanged = function(inputLevel){
		userInfo.saveLevel(inputLevel);
		sudokulevel = inputLevel;
		getNewPuzzle();
		bestTimeController.loadBestTime(levelCtrl.currentLevel());
	}

	this.currentLevel = function(){
		if(userInfo.getLevel() !== undefined) {
			return userInfo.getLevel();
		}
		return sudokulevel;
	}
}

var bestTimeController = new BestTimeController();
var levelCtrl = new LevelSelectionController();

function bouceOutFinishedTime(isNewBest, time){
	var ann = new StayAnnimation(500);
	if(isNewBest) ann = new NewBestAnnimation(ann);
	ann = new FinishTimeAnnimation(ann, time);
	ann.start();
}

function NewBestAnnimation(ann){
	this.__proto__ = new BouncedInAndOutAnnimation(ann, 'new-best-sign', 'New Best');
	if(itsIE()){
		this.start = function(){}
		this.afterItsEnd = function(action){}
	}
}

function FinishTimeAnnimation(ann, time){
	this.__proto__ = new BouncedInAndOutAnnimation(ann, 'time-puzzle-finished', time);
	if(itsIE()){
		this.start = function(){}
		this.afterItsEnd = function(action){}
	}
}

function StayAnnimation(duration){
	var actionAfterTO;
	var tic;
	this.start = function(){
		tic = setInterval(this.end, duration);
	}
	this.end = function(){
		actionAfterTO();
		clearInterval(tic);
	}
	this.afterItsEnd = function(action){
		actionAfterTO = action;
	}
}


function WarningMatrix(x, y){

	function NormalCell(){
		this.addError = function(){return new LightCell();}
		this.render = function(i, j){};
		this.clearBg = function(i, j){};
	};

	function LightCell(){
		this.addError = function(){return new MediumCell();}
		this.render = function(i, j){puzzleView.lightBg(i, j)};
		this.clearBg = function(i, j){puzzleView.clearBg(i, j)};
	};

	function MediumCell(){
		this.render = function(i, j){puzzleView.mediumBg(i, j)};
		this.addError = function(){ return new DarkCell();}
		this.clearBg = function(i, j){puzzleView.clearBg(i, j)};
	}

	function DarkCell(){
		this.render = function(i, j){puzzleView.darkBg(i, j)};
		this.addError = function(){ return this;}
		this.clearBg = function(i, j){puzzleView.clearBg(i, j)};
	}
	var matrix = [];
	_.times(x, function(){var row = [];
						  _.times(y, function(){row.push(new NormalCell())});
						  matrix.push(row);
						 });

	this.addError = function(error){
		var zoneSpot = error.zone();
		_.each(zoneSpot, function(spot){
			matrix[spot.i][spot.j] = matrix[spot.i][spot.j].addError();
		})

		var errorSpot = error.spots();
	}

	this.update = function(errors){
		this.clearWarnings();
		var result = new WarningMatrix(x, y);
		_.each(errors, function(error){result.addError(error)});
		result.renderWarnings();
		return result;
	};

	function forAll(action){
		_.each(_.range(0, x), function(i){
			   _.each(_.range(0, y), function(j){
			   		  action(i, j);
			   })
		})
	}

	this.renderWarnings = function(){
		forAll(function(i,j){matrix[i][j].render(i, j);})
	};
	this.clearWarnings = function(){
		forAll(function(i,j){matrix[i][j].clearBg(i, j);})
	}

	this.clearAll = function(){
		this.clearWarnings();
		return new WarningMatrix(x, y);
	}
}

var userInfo = undefined

function onDocReady(){
	userInfo = new UserInfo(localStorage)
	timer = new StopWatch();
	timer.setShowInView(puzzleView.showTime);
	$('#sudoku-level').val(levelCtrl.currentLevel());
	$('#button-new').click(getNewPuzzle);
	puzzleView.setLevelSelectionDelegation(levelCtrl.levelChanged);
	bestTimeController.loadBestTime(levelCtrl.currentLevel());
	getNewPuzzle();
}

$(onDocReady);