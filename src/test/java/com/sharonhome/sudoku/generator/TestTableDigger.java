package com.sharonhome.sudoku.generator;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Random;

import org.jmock.Expectations;
import org.jmock.Mockery;
import org.jmock.Sequence;
import org.junit.Assert;
import org.junit.Test;

public class TestTableDigger {
	Mockery context = new Mockery();
	final Sequence randSeq= context.sequence("predefined sequence");
	@Test
	public void testShufflePos() {
		final RandomNumberGen rand = context.mock(RandomNumberGen.class);
		HolesCandidate candidates = new HolesCandidate(2, 2);
		RandomSpotSeq randomSpotSeq = new RandomSpotSeq(candidates, rand);
		context.checking(new Expectations() {{
		    oneOf(rand).nextInt(4);inSequence(randSeq);will(returnValue(3));
		    oneOf(rand).nextInt(3);inSequence(randSeq);will(returnValue(2));
		    oneOf(rand).nextInt(2);inSequence(randSeq);will(returnValue(1));
		    oneOf(rand).nextInt(1);inSequence(randSeq);will(returnValue(0));
		}}
		);

		assertEquals(new Spot(1, 1), randomSpotSeq.next());
		assertEquals(new Spot(1, 0), randomSpotSeq.next());
		assertEquals(new Spot(0, 1), randomSpotSeq.next());
		assertEquals(new Spot(0, 0), randomSpotSeq.next());
	}
	
	@Test
	public void testDig1Hole(){
		int [][] puzzle = {{0, 0}, {0, 0}};
		
		SudokuSolver solver = new SudokuSolver(1);
		solver.setSolutionCandidates(new int []{1});
		
		HolesCandidate candidates = new HolesCandidate(2, 2);
		final RandomNumberGen rand = context.mock(RandomNumberGen.class);
		RandomSpotSeq randomSpotSeq = new RandomSpotSeq(candidates, rand);
		context.checking(new Expectations() {{
		    oneOf(rand).nextInt(4);inSequence(randSeq);will(returnValue(0));
		    oneOf(rand).nextInt(3);inSequence(randSeq);will(returnValue(1));
		    oneOf(rand).nextInt(2);inSequence(randSeq);will(returnValue(2));
		    oneOf(rand).nextInt(1);inSequence(randSeq);will(returnValue(3));
		}}
		);

		Spot[] holes = dig(puzzle, solver, randomSpotSeq, 1);
		assertEquals(1, holes.length);
		assertEquals(new Spot(0, 0), holes[0]);
	}
	
	@Test
	public void testDig12Holes(){
		int [][] puzzle = {{0, 0}, {0, 0}};
		SudokuSolver solver = new SudokuSolver(1);
		solver.setSolutionCandidates(new int []{1});

		HolesCandidate candidates = new HolesCandidate(2, 2);
		final RandomNumberGen rand = context.mock(RandomNumberGen.class);
		RandomSpotSeq randomSpotSeq = new RandomSpotSeq(candidates, rand);
		context.checking(new Expectations() {{
		    oneOf(rand).nextInt(4);inSequence(randSeq);will(returnValue(0));
		    oneOf(rand).nextInt(3);inSequence(randSeq);will(returnValue(0));
		    oneOf(rand).nextInt(2);inSequence(randSeq);will(returnValue(0));
		    oneOf(rand).nextInt(1);inSequence(randSeq);will(returnValue(0));
		}}
		);
		

		Spot[] holes2 = dig(puzzle, solver, randomSpotSeq, 2);
		assertEquals(2, holes2.length);
		assertEquals(new Spot(0, 0), holes2[0]);
		assertEquals(new Spot(1, 1), holes2[1]);
	}
	
	@Test
	public void testDigReturnsNull(){
		int [][] puzzle = {{0, 1}, {0, 1}};
		SudokuSolver solver = new SudokuSolver(1);
		solver.setSolutionCandidates(new int []{1});
		
		HolesCandidate candidates = new HolesCandidate(2, 2);
		final RandomNumberGen rand = context.mock(RandomNumberGen.class);
		RandomSpotSeq randomSpotSeq = new RandomSpotSeq(candidates, rand);
		context.checking(new Expectations() {{
		    oneOf(rand).nextInt(4);inSequence(randSeq);will(returnValue(0));
		    oneOf(rand).nextInt(3);inSequence(randSeq);will(returnValue(0));
		    oneOf(rand).nextInt(2);inSequence(randSeq);will(returnValue(0));
		    oneOf(rand).nextInt(1);inSequence(randSeq);will(returnValue(0));
		}}
		);
	
		Spot[] holes2 = dig(puzzle, solver, randomSpotSeq, 2);
		assertNull(holes2);
	}
	
	@Test
	public void testDigARealOne(){
		int [][] table = {{8,2,4,7,5,3,9,1,6},
						   {9,5,3,2,1,6,8,7,4},
						   {6,7,1,8,4,9,5,2,3},
						   {4,6,9,1,8,2,7,3,5},
						   {5,1,7,3,9,4,2,6,8},
						   {2,3,8,6,7,5,4,9,1},
						   {3,8,6,5,2,7,1,4,9},
						   {7,9,5,4,3,1,6,8,2},
						   {1,4,2,9,6,8,3,5,7}};
		SudokuSolver solver = new SudokuSolver(1);
		solver.setSolutionCandidates(new int []{1, 2, 3, 4, 5, 6, 7, 8, 9});
		
		HolesCandidate candidates = new HolesCandidate(9, 9);
		RandomNumberGen rand = new RandomNumberGenbyRandom();
		RandomSpotSeq randomSpotSeq = new RandomSpotSeq(candidates, rand);

		Spot[] holes2 = dig(table, solver, randomSpotSeq, 32);
		System.out.print(holes2.length);
		int [][] puzzle = erase(table, holes2);
		for(int i = 0; i < 9; i++){
			System.out.println();
			for(int j = 0; j < 9; j++){
				if(puzzle[i][j] == -1){
					System.out.print(" ");
				}else{
				System.out.print(puzzle[i][j]);}
				System.out.print(", ");
			}
		}
	}
	
	private int[][] erase(int[][] table, Spot[] holes2) {
		int [][] result = deepcopy(table);
		for(Spot s : holes2)
			result[s.geti()][s.getj()] = -1;
		return result;
	}

	private Spot[] dig(int[][] puzzle, SudokuSolver solver, RandomSpotSeq randomSpotSeq, int requiredHoles) {
		int [][] localPuzzle = deepcopy(puzzle);
		int nrOfHoles = 0;
		Spot[] result = new Spot[requiredHoles];
		while(nrOfHoles < requiredHoles && randomSpotSeq.nrOfCandidates() != 0){
			Spot next = randomSpotSeq.next();
			int x = next.geti();
			int y = next.getj();
			int temp = localPuzzle[x][y];
			localPuzzle[x][y] = -1;
			ArrayList<int[][]> solutions = new ArrayList<int[][]>();
			solver.solve(localPuzzle, solutions);
			if(solutions.size() == 1){
				result[nrOfHoles++] = next;
			}else{
				localPuzzle[x][y]= temp;
			}
		}
		if (nrOfHoles == requiredHoles)
			return result;
		return null;
	}

	private int[][] deepcopy(int[][] puzzle) {
		int result[][] = new int [puzzle.length][puzzle[0].length];
		for(int i = 0; i < puzzle.length; i ++){
			for(int j = 0; j < puzzle[i].length; j++){
				result[i][j] = puzzle[i][j];
			}
		}
		return result;
	}

}
