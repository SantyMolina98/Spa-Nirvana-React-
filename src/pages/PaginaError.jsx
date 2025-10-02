import '../App.css';
import '../styles/PaginaError.css';
import 'bootstrap';
import { Link } from 'react-router-dom';

function PaginaError() {
  return (
     <main>
        <div className="error-container">
            <div className="error_code">
                 <p>4</p>
                 <p>0</p>
                 <p>4</p>
             </div>
             <p className="error_title center" >PAGE NOT FOUND</p>
             <div className="center">
              <Link to="/">
                <input type="button" class="btn" value="Ir a Inicio" />
              </Link>
            </div>
        </div>   
    </main>
  )
}

export default PaginaError;