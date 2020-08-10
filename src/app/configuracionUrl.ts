//import { UserLoginService } from './service/user-login.service';
import { environment } from '../environments/environment.prod';

export class ConfiguracionUrl{
  getUrlApi(){//URL API BACK(CON TOKEN)
    return "https://v5yco0dws5.execute-api.us-west-2.amazonaws.com/Stage/v1/";
  }

  getUrlApiTemp(){//URL API BACK(CON TOKEN)
    return "https://bawbuq4538.execute-api.us-west-2.amazonaws.com/Stage/";
  }

  getUrlApiNav(){//URL API BACK(CON TOKEN)
    return "https://v5yco0dws5.execute-api.us-west-2.amazonaws.com/Stage/modulo/obtenerMenu2/1";
  }

  getUrlApiNomina(){//URL API BACK(CON TOKEN)
    return "https://v5yco0dws5.execute-api.us-west-2.amazonaws.com/Stage/v1/";
  }

  getUrlBase(){//URL FRONT (ANGULAR)
    return "http://payoutsv1.s3-website-us-west-2.amazonaws.com/";
    //return "http://localhost:4200/";
  }
  getUrlAccion(){//URL API BACK VISA (ACCION/SIN TOKEN)
    return "https://1lus0iktme.execute-api.us-west-2.amazonaws.com/";
  }
}
