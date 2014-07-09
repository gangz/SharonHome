<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
	<%@ page isELIgnored="false" %>	
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Prim Sudoku</title>
    <LINK href="<c:url value="/resources/images/icon.png"/>" type=image/x-icon rel="shortcut icon" />
    <link href="<c:url value="/resources/js/dist/css/bootstrap.css"/>" rel="stylesheet">
    <link href="<c:url value="/resources/js/dist/css/starter.css" />" rel="stylesheet">
    <link href="<c:url value="/resources/js/dist/css/animate.css" />" rel="stylesheet">

	<script type="text/javascript">
		// var puzzle = ${puzzle};
	</script>
</head>
<body>

    <div class="blog-masthead">
      <div class="container">
        <nav class="blog-nav">
          <a class="blog-nav-item active" href="#"><span class="glyphicon glyphicon-home"></span></a>
        </nav>
      </div>
    </div>

	<div class="container">
      	<div class="starter-template">
			<h1>Sudoku</h1>	
			<p class="lead"> <br> </p>

			<div class="row">
				<div class="col-md-3">
				</div>

				<div class="col-md-6">
					<p id="timing">00:00:00</p>
					<div class="row">
						<div class = "col-md-4 col-md-offset-4">
							<select class="form-control" id="sudoku-level">
							    <option value="easy">Easy</option>
							    <option value="normal" selected="selected">Normal</option>
							    <option value="hard">Hard</option>
							    <option value="evil">Evil</option>
							</select>
						</div>
					</div>
					<br>
					<%@ include file="table.jsp"%>
					<br>
					<button class="btn btn-default btn-lg" id="button-clear"><span class="glyphicon glyphicon-repeat"></span> Clear</button>
					<button class="btn btn-default btn-lg" id="button-new"><span class="glyphicon glyphicon-download"></span> New </button>

				</div>
			</div>
      	</div>
	</div>

	<script src="<c:url value="/resources/js/underscore-min.js"/>"></script>
	<script src="<c:url value="/resources/js/jquery-1.11.1.min.js"/>"></script>
	<script src="<c:url value="/resources/js/sudokuController.js"/>"></script>
	<script src="<c:url value="/resources/js/sudokuView.js"/>"></script>
	<script src="<c:url value="/resources/js/sudokuModel.js"/>"></script>
</body>
</html>