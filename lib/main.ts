import { BigNumber, Complex, EvalFunction, Fraction, Matrix, Unit, compile } from "mathjs";
import { useEffect, useState } from "react";

export type InputType = number | BigNumber | Fraction | Complex | Matrix | Unit | null;
export type OutputType = InputType;

export function useCalculator(expression: string, inputs?: { 
	[ key: string ]: InputType
}): {value: OutputType | null, error?: unknown} {
	const [ compiled, setCompiled ] = useState<EvalFunction | null>(null);
	
	useEffect(() => {
		try {
			setCompiled(compile(expression));
		} catch(e) {
			
			setCompiled(null);
		}
	}, [expression]);
	try {
		return { value: compiled ? compiled.evaluate(inputs) as OutputType : null };
	} catch(error) {
		
		return { value: null, error };
	}
}