import { Hourglass} from 'react-loader-spinner'

import css from './Loader.module.css'


const Loader: React.FC = () => {
  return (
    <div className={css.loader}>  <Hourglass
    visible={true}
    height="80"
    width="80"
    ariaLabel="hourglass-loading"
    wrapperStyle={{}}
    wrapperClass=""
    colors={['rgb(86, 14, 158)', '#ba8ceb']}
    />
      </div>
  )
}

export default Loader