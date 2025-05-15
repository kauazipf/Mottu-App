import { Moto } from './Moto';

export type RootDrawerParamList = {
  inicio: undefined;
  listademotos: { status?: string }; 
  cadastrarmotos: undefined;
  statusmotos: undefined;
  detalhesdasmotos: { moto: Moto };
};

