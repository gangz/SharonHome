﻿<!DOCTYPE html>
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
    <link href="<c:url value="/resources/js/dist/css/bootstrap-theme.min.css"/>" rel="stylesheet">
    <link href="<c:url value="/resources/js/dist/css/about.css"/>" rel="stylesheet">
    <!--[if IE]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="<c:url value="/resources/js/respond.min.js"/>"></script>
    <![endif]-->
    <link href="<c:url value="/resources/js/dist/css/starter.css" />" rel="stylesheet">
    <link href="<c:url value="/resources/js/dist/css/animate.css" />" rel="stylesheet">

</head>
<body>

    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Prim Sudoku</a>
            </div>

            <div class="collapse navbar-collapse">
              <ul class="nav navbar-nav">
                <li><a href="#">Home</a></li>
                <li><a href="sudoku.htm">Game</a></li>
                <li class="active"><a href="aboutSudoku.htm">About</a></li>
              </ul>
            </div>              
        </div>
    </div>
    <div class="container theme-showcase" role="main">
        <div class="jumbotron">
            <div class="row">
                <div class="col-md-2">
                    <img src="<c:url value="/resources/images/icon.png"/>" height="135" width="135" style="  margin-top:20px">
                </div>
                <div class="col-md-10">
                    <h1>数独 <small> Sudoku.</small></h1>
                    <p>挑战，探索，排除，发现，确定，这就是数独带来的快乐，从不一成不变，与计算无关</p>
                    <p>Having fun in Sudoku</p>

                </div>
            </div>
        </div>


        <div class="navbar navbar-default">
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="#Csudoku">数独</a>
                    </li>
                    <li>
                        <a href="#Csolve">求解</a>
                    </li>
                    <li>
                        <a href="#Cstatistic">统计</a>
                    </li>
                </ul>

            </div>
        </div>

        <a id="Csudoku"></a>
        <div class="page-header">
            <h1>数独 <small>Sudoku</small></h1>
        </div>
        <p>数独就是在一个9*9的表格中填数字</p>
        <ul>
            <li>
                <p>在每个单元格中填从1到9任意一个数字</p>
                <img src="<c:url value="/resources/images/sudoku.jpg"/>" height="200">
            </li>
            <br>
            <li>
                <p>使得每一行, 每一列, 每一个九宫格中都有从1到9, 九个不同的数字</p>
                <br>
                <div class="row">
                    <div class="col-md-4">
                        <img src="<c:url value="/resources/images/row.jpg"/>" height="200">
                    </div>
                    <div class="col-md-4">
                        <img src="<c:url value="/resources/images/column.jpg"/>" height="200">
                    </div>
                    <div class="col-md-4">
                        <img src="<c:url value="/resources/images/block.jpg"/>" height="200">                
                    </div>
                </div>
            </li>
        <br>
            <li>
                <p>每个数独的解都是唯一的！</p>
            </li>
        <br>
        </ul>

        <a href="sudoku.htm" class="btn btn-default btn-lg" role="button">开始玩数独 »</a>
        <br>
        <br>
        <div class="page-header">
            <h1><a id="Csolve"></a>数独求解 <small>How to solve sudoku</small></h1>
        </div>

        <ul class="nav nav-tabs" role="tablist">
            <li class="active">
                <a href="#tab-naked-single">Naked Single</a>
            </li>
            <li>
                <a href="#tab-hidden-single">Hidden Single</a>
            </li>
            <li>
                <a href="#tab-locked-candidates">Locked Candidates</a>
            </li>
        </ul>
        <br>

        <div class="tab-content">
            <div class="tab-pane active" id="tab-naked-single">
                <div id="carousel-naked-single" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators" >
                        <li data-target="#carousel-naked-single" data-slide-to="0" class="active"></li>
                        <li data-target="#carousel-naked-single" data-slide-to="1"></li>
                        <!-- <li data-target="#carousel-example-generic" data-slide-to="2"></li> -->
                    </ol>
                    <!-- Wrapper for slides -->
                    <div class="carousel-inner">
                        <div class="item active">
                            <img src="<c:url value="/resources/images/nakedSingle_1.jpg"/>" style="height: 500px; margin: 0 auto">
                            <div class="carousel-caption">
                                <h3>Naked Single</h2>
                            </div>
                        </div>
                        <div class="item">
                            <img src="<c:url value="/resources/images/nakedSingle_2.jpg"/>" style="height: 500px; margin: 0 auto">
                            <div class="carousel-caption">
                                <h3>Naked Single</h2>                        
                            </div>
                        </div>
                    </div> 
                    <!-- Controls -->
                     <a class="left carousel-control" href="#carousel-naked-single" role="button" data-slide="prev" style="background:none">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                    </a>
                    <a class="right carousel-control" href="#carousel-naked-single" role="button" data-slide="next" style="background:none">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                    </a>

                </div>
            </div>

            <div class="tab-pane" id="tab-hidden-single">
                <div id="carousel-hidden-single" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators" >
                        <li data-target="#carousel-hidden-single" data-slide-to="0" class="active"></li>
                        <li data-target="#carousel-hidden-single" data-slide-to="1"></li>
                        <!-- <li data-target="#carousel-example-generic" data-slide-to="2"></li> -->
                    </ol>
                    <!-- Wrapper for slides -->
                    <div class="carousel-inner">
                        <div class="item active">
                            <img src="<c:url value="/resources/images/hiddenSingle_1.jpg"/>" style="height: 500px; margin: 0 auto">
                            <div class="carousel-caption">
                                <h3>Hidden Single</h2>
                            </div>
                        </div>
                        <div class="item">
                            <img src="<c:url value="/resources/images/hiddenSingle_2.jpg"/>" style="height: 500px; margin: 0 auto">
                            <div class="carousel-caption">
                                <h3>Hidden Single</h2>                        
                            </div>
                        </div>
                    </div> 
                    <!-- Controls -->
                     <a class="left carousel-control" href="#carousel-hidden-single" role="button" data-slide="prev" style="background:none">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                    </a>
                    <a class="right carousel-control" href="#carousel-hidden-single" role="button" data-slide="next" style="background:none">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                    </a>

                </div>
            </div>

            <div class="tab-pane" id="tab-locked-candidates">
                <div id="carousel-locked-candidates" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators" >
                        <li data-target="#carousel-locked-candidates" data-slide-to="0" class="active"></li>
                        <li data-target="#carousel-locked-candidates" data-slide-to="1"></li>
                        <!-- <li data-target="#carousel-example-generic" data-slide-to="2"></li> -->
                    </ol>
                    <!-- Wrapper for slides -->
                    <div class="carousel-inner">
                        <div class="item active">
                            <img src="<c:url value="/resources/images/lockedCandidates_1.jpg"/>" style="height: 500px; margin: 0 auto">
                            <div class="carousel-caption">
                                <h3>Locked Candidates</h2>
                            </div>
                        </div>
                        <div class="item">
                            <img src="<c:url value="/resources/images/lockedCandidates_2.jpg"/>" style="height: 500px; margin: 0 auto">
                            <div class="carousel-caption">
                                <h3>Locked Candidates</h2>                        
                            </div>
                        </div>
                    </div> 
                    <!-- Controls -->
                     <a class="left carousel-control" href="#carousel-locked-candidates" role="button" data-slide="prev" style="background:none">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                    </a>
                    <a class="right carousel-control" href="#carousel-locked-candidates" role="button" data-slide="next" style="background:none">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                    </a>

                </div>
            </div>

        </div>
        <br>
        <a href="sudoku.htm" class="btn btn-default btn-lg" role="button">开始玩数独 »</a>
        <br>


        <div class="page-header">
            <h1><a id="Cstatistic"></a>统计 <small>Statistic</small></h1>
        </div>

        
    </div>
    <script src="<c:url value="/resources/js/jquery-1.11.1.min.js"/>"></script>
    <script src="<c:url value="/resources/js/dist/js/bootstrap.min.js"/>"></script>
    <div style="display:none">
    <script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1000540895'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s19.cnzz.com/z_stat.php%3Fid%3D1000540895' type='text/javascript'%3E%3C/script%3E"));</script>
    </div>
    <script type="text/javascript">
        $(function(){
            $('.tab-pane').hide();
            $('.tab-pane.active').show();
            $('li', $('.nav-tabs')).click(function(){
                $('.tab-pane').hide();
                $($('a', $(this)).first().attr('href')).show();
                $('li', $('.nav-tabs')).removeClass('active');
                $(this).addClass('active');
            })
        });
    </script>

</body>
</html>