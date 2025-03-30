import CollegeDetails from '../models/collegedetails.model';
import { ApiError } from '../utils/apiError';

class CollegeDetailsService {
  async getCollegeDetails(organizationName: string) {
    const college = await CollegeDetails.findOne({ organizationName });
    if (!college) {
      throw new ApiError(404, 'College details not found');
    }
    return college;
  }

  async createOrUpdateCollegeDetails(organizationName: string, data: any) {
    let college = await CollegeDetails.findOne({ organizationName });

    if (!college) {
      college = new CollegeDetails({ organizationName, ...data });
    } else {
      Object.assign(college, data);
    }

    await college.save();
    return college;
  }

  async updatePrograms(organizationName: string, programs: any) {
    const college = await CollegeDetails.findOne({ organizationName });
    if (!college) {
      throw new ApiError(404, 'College details not found');
    }

    college.programs = programs;
    await college.save();
    return college;
  }

  async addReview(organizationName: string, review: any) {
    const college = await CollegeDetails.findOne({ organizationName });
    if (!college) {
      throw new ApiError(404, 'College details not found');
    }

    college.studentReviews.push(review);
    await college.save();
    return college;
  }
}

export default new CollegeDetailsService();