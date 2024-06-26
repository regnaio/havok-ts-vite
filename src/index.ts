import HavokPhysics from '@babylonjs/havok';
import type {
	HP_BodyId,
	HP_ShapeId,
	//
	HP_WorldId,
	//
	ObjectStatistics,
} from '@babylonjs/havok';

const HK = await HavokPhysics();
console.log('HK:', HK);

/* -------------------------------------------------------------------- Result -------------------------------------------------------------------- */
/*
  Is there a better way to get the `Result` type?

  This works, but the developer experience could be better
*/
type Result = ReturnType<typeof HK.HP_GetStatistics>[0];
let result: Result;

/* -------------------------------------------------------------------- World --------------------------------------------------------------------- */
let world: HP_WorldId;
[result, world] = HK.HP_World_Create();
console.assert(result === HK.Result.RESULT_OK);

result = HK.HP_World_SetGravity(world, [0, -9.8, 0]);
console.assert(result === HK.Result.RESULT_OK);

/* -------------------------------------------------------------------- Shape --------------------------------------------------------------------- */
let shape: HP_ShapeId;
[result, shape] = HK.HP_Shape_CreateBox([0, 0, 0], [0, 0, 0, 1], [1, 1, 1]);
console.assert(result === HK.Result.RESULT_OK);

result = HK.HP_Shape_SetMaterial(shape, [
	//
	1,
	1,
	0.5,
	HK.MaterialCombine.MINIMUM,
	HK.MaterialCombine.MULTIPLY,
]);
console.assert(result === HK.Result.RESULT_OK);

result = HK.HP_Shape_SetFilterInfo(shape, [1, 2]);
console.assert(result === HK.Result.RESULT_OK);

/* --------------------------------------------------------------------- Body --------------------------------------------------------------------- */
let body: HP_BodyId;
[result, body] = HK.HP_Body_Create();
console.assert(result === HK.Result.RESULT_OK);

result = HK.HP_Body_SetShape(body, shape);
console.assert(result === HK.Result.RESULT_OK);

result = HK.HP_Body_SetMassProperties(body, [
	//
	[0, 0, 0],
	1,
	[1, 1, 1],
	[0, 0, 0, 1],
]);
console.assert(result === HK.Result.RESULT_OK);

result = HK.HP_Body_SetMotionType(body, HK.MotionType.DYNAMIC);
console.assert(result === HK.Result.RESULT_OK);

result = HK.HP_Body_SetActivationControl(body, HK.ActivationControl.ALWAYS_ACTIVE);
console.assert(result === HK.Result.RESULT_OK);

result = HK.HP_Body_SetQTransform(body, [
	//
	[0, 0, 0],
	[0, 0, 0, 1],
]);
console.assert(result === HK.Result.RESULT_OK);

/* -------------------------------------------------------------- Add Body to World --------------------------------------------------------------- */
result = HK.HP_World_AddBody(world, body, false);
console.assert(result === HK.Result.RESULT_OK);

/* --------------------------------------------------------------------- Step --------------------------------------------------------------------- */
result = HK.HP_World_Step(world, 1 / 60);
console.assert(result === HK.Result.RESULT_OK);

/* --------------------------------------------------------------- ObjectStatistics --------------------------------------------------------------- */
let objectStatistics: ObjectStatistics;
[result, objectStatistics] = HK.HP_GetStatistics();
console.assert(result === HK.Result.RESULT_OK);
console.log('objectStatistics:', objectStatistics);
