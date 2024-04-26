import { BigNumber, Complex, EvalFunction, Fraction, Matrix, Unit, compile } from "mathjs";
import { useEffect, useState } from "react";

export type InputType = number | BigNumber | Fraction | Complex | Matrix | Unit | null;
export type OutputType = InputType;

export function useCalculator(expression: string, inputs?: { 
	[ key: string ]: InputType
}): OutputType | null {
	const [ compiled, setCompiled ] = useState<EvalFunction | null>(null);
	
	useEffect(() => {
		setCompiled(compile(expression));
	}, [expression]);
	
	return compiled ? compiled.evaluate(inputs) as OutputType : null;
}