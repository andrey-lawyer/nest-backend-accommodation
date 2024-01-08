import { v2, ConfigOptions } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: async (): Promise<typeof v2> => {
    const cloudinaryConfig: ConfigOptions = {
      cloud_name: 'dfabwuifs',
      api_key: '347249973353644',
      api_secret: 'qG6atx3_ISW2Tm0mzqyApsszCPk',
    };

    v2.config(cloudinaryConfig);

    return v2;
  },
};
