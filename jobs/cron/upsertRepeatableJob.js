
export const upsertRepeatableJob = async (queue, jobDef, data = {}) => {

    const { name, options } = jobDef;
    const { repeat, jobId } = options;
    console.log('name', name)

    if (!repeat?.cron || !jobId) {
        throw new Error('Both repeat.cron and jobId must be defined in job options.');
    }

    const repeatableJobs = await queue.getRepeatableJobs();

    const existingJob = repeatableJobs.find(job => job.name === name);
    console.log(existingJob);
    try {
        if (existingJob) {
            console.log(name);
            console.log(`Removing old job with cron: ${existingJob.pattern}`);
            console.log ()
            const deleted = await queue.removeRepeatable(existingJob.name, {
                cron: existingJob.pattern,
                jobId: existingJob.key,
                tz: existingJob.tz || undefined,
                endDate: existingJob.endDate || undefined,
                every: existingJob.every || undefined
            });
            console.log('deleted', deleted);
        }

        console.log(`Adding job with new cron: ${repeat.cron}`);

        await queue.add(name, data, {
            jobId,
            repeat,
            removeOnComplete: true,
            removeOnFail: true
        });
    }
    catch (e) {
        console.log(e);
    }
}