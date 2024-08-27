import * as cheerio from "cheerio";
import axios from "axios";

async function getNaukriDetails() {
  console.log("Fetching naukri details...");

  const response = await axios.get("https://www.quikr.com/jobs/it-software-developer+zwqxj1466534506");
  const html = response.data;

  const $ = cheerio.load(html);

  const jobs = $(".apply-block");
  console.log(jobs.length);
  const results = [];

  for (const job of jobs) {
    // console.log(job);
    try {
      results.push({
        jobTitle: $(job).find(".m0 a").text().trim(),
        companyName: $(job).find(".ls-jobs .salaryNjobtype .salary .attributeSection .cursor-default").text().trim(),
        location: $(job).find(".city").text(),
        jobType: $(job).find(".ls-jobs .salaryNjobtype .m-salary .attributeVal").text(),
        postedDate: $(job).find(".jsPostedOn").text(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  console.log("RESULTS", results);
}

getNaukriDetails();
