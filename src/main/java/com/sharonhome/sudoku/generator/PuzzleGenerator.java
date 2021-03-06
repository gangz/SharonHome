package com.sharonhome.sudoku.generator;

import com.sharonhome.sudoku.ranking.Puzzle;
import com.sharonhome.sudoku.table.RandomTableGenerator;

public class PuzzleGenerator {
	SetSet ss = new SetSet(new int[][] { { 0, 3, 6 }, { 1, 4, 7 },
			{ 2, 5, 8 } });
	CSLCRSetNumberingSystem setNs = new CSLCRSetNumberingSystem();
	CSLCRSetGenerator setGen = new CSLCRSetGenerator(ss, setNs);

	CSLCRPerGenerator perGen = new CSLCRPerGenerator(setGen);

	HolesCandidate candidates = new HolesCandidate(9, 9);
	RandomNumberGen rand = new RandomNumberGenbyRandom();
	Digger digger = new Digger();

	SudokuSolver solver = new SudokuSolver(3);
	TableGenerator tableGen = new TableGenerator();
	
	public PuzzleGenerator(){
		solver.setSolutionCandidates(new int []{0, 1, 2, 3, 4, 5, 6, 7, 8});
	}
	
	public int [][] generatePuzzle(int cslcrNum, int holeCount){
		int [][] result = null;
		
		int[] cslcr = perGen.getNthPerCSLCR(cslcrNum);
		int[][] table = tableGen.genTable(cslcr, cslcr, cslcr);
		RandomSpotSeq randomSpotSeq = new RandomSpotSeq(candidates,
						rand);
		Spot[] holes = digger.dig(table, solver, randomSpotSeq, holeCount);
		if(holes == null) return result;
		result = digger.eraseHoles(table, holes);
		
		return result;
	}
	
	public int [][] generatePuzzleNew(int holeCount){
		int [][] result = null;
		
		RandomTableGenerator tableGenNew = new RandomTableGenerator();
		int[][] table = tableGenNew.genTable();
		RandomSpotSeq randomSpotSeq = new RandomSpotSeq(candidates,	rand);
		SudokuSolver solverNew = new SudokuSolver(3);
		solverNew.setSolutionCandidates(new int []{1, 2, 3, 4, 5, 6, 7, 8, 9});
		Spot[] holes = digger.dig(table, solverNew, randomSpotSeq, holeCount);
		if(holes == null) return result;
		result = digger.eraseHoles(table, holes);
		
		return result;
	}
}
