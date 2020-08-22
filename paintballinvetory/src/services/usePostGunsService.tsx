import { useEffect, useState } from 'react';
import { Service } from '../types/Service';
import { Gun } from '../types/Gun';

export interface Guns {
  results: Gun[];
}

const usePostGunsService = () => {
  const [result, setResult] = useState<Service<Guns>>({
    status: 'loading'
  });

  useEffect(() => {
    fetch('http://paintballinventory-env.eba-yah5svs5.us-east-2.elasticbeanstalk.com/api/guns')
      .then(response => response.json())
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export default usePostGunsService;