//import { UserLoginService } from './service/user-login.service';
import { environment } from '../environments/environment.prod';

export class ConfiguracionUrl{
  getUrlApi(){//URL API BACK(CON TOKEN)
    return "https://bawbuq4538.execute-api.us-west-2.amazonaws.com/Stage/v1/";
  }

  getUrlApiNav(){//URL API BACK(CON TOKEN)
    return "https://bawbuq4538.execute-api.us-west-2.amazonaws.com/Stage/modulo/obtenerMenu2/1";
  }

  getUrlBase(){//URL FRONT (ANGULAR)
    //return "http://testingaunaafiliaciones.s3-website-us-west-2.amazonaws.com/";
    return environment.url;
  }
  getUrlAccion(){//URL API BACK VISA (ACCION/SIN TOKEN)
    return "https://1lus0iktme.execute-api.us-west-2.amazonaws.com/";
  }
}
